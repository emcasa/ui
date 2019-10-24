import isArray from 'lodash/isArray'
import googleMaps from '@google/maps'
import {filterComponent} from './helpers'

const isValidRadius = (radius) => radius && !isNaN(radius)

const isValidLocation = (location) =>
  isArray(location) && location.length === 2 && location.findIndex(isNaN) === -1

const getLocation = (result) => result.geometry.location

const getMissingAddressComponents = (components, result) =>
  components.filter(
    (component) => !filterComponent(result.address_components, component)
  )

export default class GoogleMapsClient {
  /**
   * @param {Object}   options
   * @param {String}   options.apiKey
   * @param {String}   options.language
   * @param {String}   options.country
   * @param {String[]} options.approximateAddressComponents Address components that should be present in the
   *                                                        response from `/details`. When a result lacks any
   *                                                        of these properties the client will attempt to
   *                                                        get an approximated result from nearby addresses.
   *                                                        When this happens, `result.approximated` is set to `true`
   * @param {String[]} options.autoCompleteTypes            Place types to include in the response from `/autoComplete`
   */
  constructor({apiKey, ...options}) {
    this.options = Object.assign(
      {
        language: 'pt-BR',
        country: 'br',
        autoCompleteTypes: ['address'],
        approximateAddressComponents: []
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
    const {approximateAddressComponents, language} = this.options
    const {json: response} = await this.client
      .place({placeid: placeId, language})
      .asPromise()
    const missingAddressComponents = getMissingAddressComponents(
      approximateAddressComponents,
      response.result
    )
    if (missingAddressComponents.length) {
      const {results} = await this.approximatedAddresses({
        location: getLocation(response.result)
      })
      if (results.length) {
        response.result.address_components = response.result.address_components.concat(
          missingAddressComponents
            .map(filterComponent(results[0].address_components))
            .filter(Boolean)
        )
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
