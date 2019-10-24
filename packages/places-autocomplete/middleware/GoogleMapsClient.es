import isArray from 'lodash/isArray'
import googleMaps from '@google/maps'
import {filterComponent} from '../helpers'

const isValidRadius = (radius) => radius && !isNaN(radius)

const isValidLocation = (location) =>
  isArray(location) && location.length === 2 && location.findIndex(isNaN) === -1

const getPostalCode = (result) =>
  filterComponent(result.address_components, 'postal_code')

const getLocation = (result) => result.geometry.location

export default class GoogleMapsClient {
  /**
   * @param {Object}   options
   * @param {String}   options.apiKey
   * @param {String}   options.language
   * @param {String}   options.country
   * @param {Boolean}  options.approximatePostalCode
   * @param {String[]} options.autoCompleteTypes
   */
  constructor({apiKey, ...options}) {
    this.options = Object.assign(
      {
        language: 'pt-BR',
        country: 'br',
        autoCompleteTypes: ['address']
      },
      options
    )
    this.client = googleMaps.createClient({
      ...this.options,
      key: apiKey,
      Promise: Promise
    })
  }

  async details(placeId) {
    const {approximatePostalCode, language} = this.options
    const {json: response} = await this.client
      .place({placeid: placeId, language})
      .asPromise()
    if (approximatePostalCode && !getPostalCode(response.result)) {
      const {results} = await this.approximatedAddresses({
        location: getLocation(response.result)
      })
      if (results.length) {
        const postalCodeComponent = getPostalCode(results[0])
        response.result.address_components.push(postalCodeComponent)
        response.result.approximated = true
      }
    }
    return response
  }

  async autoComplete(input, {sessionToken, location, radius} = {}) {
    const {autoCompleteTypes, country, language} = this.options
    const query = {
      input,
      language,
      components: {country},
      types: autoCompleteTypes,
      sessiontoken: sessionToken
    }
    if (isValidLocation(location)) {
      query.location = location.map(parseFloat)
      if (isValidRadius(radius)) query.radius = parseInt(radius)
    }
    const {json: result} = await this.client
      .placesAutoComplete(query)
      .asPromise()
    return result
  }

  async approximatedAddresses({location}) {
    const {language} = this.options
    const query = {
      language,
      latlng: location,
      location_type: ['ROOFTOP', 'RANGE_INTERPOLATED']
    }
    const {json: result} = await this.client.reverseGeocode(query).asPromise()
    return result
  }
}
