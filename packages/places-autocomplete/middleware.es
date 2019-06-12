import isArray from 'lodash/isArray'
import express from 'express'
import googleMaps from '@google/maps'

const isValidRadius = (radius) => !radius || isNaN(radius)
const isValidLocation = (location) =>
  isArray(location) && location.length === 2 && location.findIndex(isNaN) === -1

export default function createMiddleware({
  apiKey,
  language = 'pt-BR',
  country = 'br',
  autoCompleteTypes = ['address', 'establishment'],
  ...options
}) {
  const router = express.Router()

  const client = googleMaps.createClient({
    ...options,
    key: apiKey,
    language,
    Promise: Promise
  })

  router.get('/autocomplete', async (req, res) => {
    const {q, sessionToken, location, radius, types = 'address'} = req.query
    const query = {
      input: q,
      language,
      components: {country},
      types: []
        .concat(types)
        .filter((t) => autoCompleteTypes.indexOf(t) !== -1),
      sessiontoken: sessionToken
    }
    if (isValidLocation(location)) {
      query.location = location.map(parseFloat)
      if (isValidRadius(radius)) query.radius = parseInt(radius)
    }
    try {
      const result = await client.placesAutoComplete(query).asPromise()
      res.status(200).send(result.json)
    } catch (e) {
      res.status(500).send({error: e})
    }
  })

  router.get('/details', async (req, res) => {
    const {q} = req.query
    try {
      const result = await client
        .place({
          placeid: q,
          language
        })
        .asPromise()
      res.status(200).send(result.json)
    } catch (e) {
      res.status(500).send({error: e})
    }
  })

  return router
}
