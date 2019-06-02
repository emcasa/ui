import express from 'express'
import googleMaps from '@google/maps'

export default function createMiddleware({
  apiKey,
  language = 'pt-BR',
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
    const {q, sessionToken} = req.query
    try {
      const result = await client
        .placesAutoComplete({
          input: q,
          language,
          components: {country: 'br'},
          types: ['address'],
          sessiontoken: sessionToken
        })
        .asPromise()
      res.status(200).send(result)
    } catch (e) {
      res.status(500).send({error: e})
    }
  })

  router.get('/placeDetail', async (req, res) => {
    const {q} = req.query
    try {
      const result = await client
        .place({
          placeid: q,
          language
        })
        .asPromise()
      res.status(200).send(result)
    } catch (e) {
      res.status(500).send({error: e})
    }
  })

  return router
}
