import express from 'express'
import GoogleMapsClient from './GoogleMapsClient'

export default function createMiddleware(options) {
  const router = express.Router()

  const client = new GoogleMapsClient(options)

  router.get('/autocomplete', async (req, res) => {
    const {q, ...params} = req.query
    try {
      const response = await client.autoComplete(q, params)
      res.status(200).send(response)
    } catch (e) {
      console.error('[@emcasa/places-autocomplete]', e)
      res.status(500).send({error: e})
    }
  })

  router.get('/details', async (req, res) => {
    const {q} = req.query
    try {
      const response = await client.details(q)
      res.status(200).send(response)
    } catch (e) {
      console.error('[@emcasa/places-autocomplete]', e)
      res.status(500).send({error: e})
    }
  })

  return router
}
