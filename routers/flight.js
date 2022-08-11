const { Router } = require('express')
const router = Router()
const Flight = require('../database/model/Flight')

// FORMAT: get-my-flight?flight=id
// to get those params req.query.id

// User routes

/**
 * Get booked flight
 */
router.get('/get-my-flight', async (req, res) => { })

/**
 * Book available flight ticket
 */
router.post('/book-flight', async (req, res) => { })

/**
 * Edit booked flight
 */
router.put('/edit-my-flight', async (req, res) => { })

/**
 * Delete booked flight
 */
router.delete('/delete-my-flight', async (req, res) => { })

//------------------------

// Admin routes
//TODO: Actions allowed only for flights that are allowed to be booked
//TODO: Add joi schema to validate coming values and add default value to the body
// FORMAT: get-my-flight?flight=id
/**
 * Get flight
 */
router.get('', async (req, res) => { })

/**
 * Add flight
 */
router.post('/', async ({ body }, res) => {
  try {
    const flight = new Flight(body)

    flight.save()

    res.send({
      message: 'The flight has been successfully saved',
      details: flight
    })
  } catch (error) {

    res.status(400).send(error)

    throw error;
  }
})

/**
 * Edit flight
 */
router.put('/edit-flight', async (req, res) => { })

/**
 * Delete flight
 */
router.delete('/delete-flight', async (req, res) => { })

module.exports = router
