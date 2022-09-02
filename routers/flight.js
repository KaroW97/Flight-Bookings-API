const { Router } = require('express')
const { createBody } = require('../utils/common')
const inputValidation = require('../JoiSchema/joiValidation')
const parser = require('../services/parser/parser')
const router = Router()
const Flight = require('../models/Flight')
const Ticket = require('../models/Ticket')
const queries = require('../services/mongo/queryUtils')
const message = require('../utils/message')

//TODO: Add data check if there is something to update
//TODO: FORBID GOING UNDER 0 WITH TICKETS/
// FORMAT: get-my-flight?flight=id
// to get those params req.query.id

// User routes

/**
 * Get available flight
 */
router.get('/available-flights', async (req, res) => {
  try {
    const query = queries.getAvailableFlights()

    const flights = await Flight.find(query)

    res.send({
      message: 'Available flights',
      length: flights.length,
      details: flights
    })
  } catch (error) {
    res.status(400).json({
      error: {
        name: error.name,
        message: error.message
      }
    })

    throw error
  }
})

/**
 * Book available flight ticket
 */
router.post('/book-flight', async (req, res) => {
  try {
    const { user, body } = req
    const { tickets } = body

    const queryFlights = queries.getFlightsToBeBooked(tickets)

    const flights = await Flight.find(queryFlights)

    if (!flights.length) throw new Error('No flights')

    // Get random flight
    const randomIndex = Math.floor(Math.random() * flights.length)

    const ticketTotalAmount = Object.values(tickets).reduce(
      (prev, curr) => prev + curr,
      0
    )

    // Create ticket for each
    const newTickets = await Promise.all(
      Object.entries(tickets).map(async ([key, value]) => {
        for (let i = 0; i < value; i++) {
          const ticket = {
            flight: flights[randomIndex]._id,
            user: user._id,
            rank: key,
            price: flights[randomIndex].ticket_prices[key].price
          }

          const createTicket = await Ticket.create(ticket)

          user.booked_tickets.push(createTicket)
        }
        return {
          type: key,
          amount: value,
          price: flights[randomIndex].ticket_prices[key].price
        }
      })
    )

    await user.save()

    const { filter, update } = queries.updateFlightAccessibility({
      ticketTotalAmount,
      tickets,
      flight: flights[randomIndex]
    })

    // Update after user succesfuly updated
    await Flight.updateOne(filter, update)

    res.send({
      message: 'Reserved flight',
      details: {
        id: flights[randomIndex]._id,
        departure_point: flights[randomIndex].departure_point,
        destination_point: flights[randomIndex].destination_point,
        start_date_time: flights[randomIndex].start_date_time,
        end_date_time: flights[randomIndex].end_date_time,
        tickets: newTickets
      }
    })
  } catch (error) {
    res.send({
      error: {
        name: error.name,
        message: error.message
      }
    })

    //throw error
  }
})

//------------------------

// Admin routes
//TODO: Actions allowed only for flights that are allowed to be booked
//TODO: Add joi schema to validate coming values and add default value to the body
// FORMAT: get-my-flight?flight=id

/**
 * Get all flights
 */
router.get('', async (req, res) => {
  try {
    const flights = await Flight.find()

    if (!flights) throw new Error('No flights')

    res.send({
      message: 'The flights have been successfully found',
      length: flights.length,
      details: flights
    })
  } catch (error) {
    res.status(400).json({
      error: {
        name: error.name,
        message: error.message
      }
    })

    throw error
  }
})

/**
 * Get flight
 */
router.get('', async (req, res) => {
  try {
    const { id } = req.query

    const flight = await Flight.findById(id)

    if (!flight) throw new Error('No flight was found')

    res.send({
      message: 'The flight has been successfully found',
      details: flight
    })
  } catch (error) {
    res.status(400).json({
      error: {
        name: error.name,
        message: error.message
      }
    })

    throw error
  }
})

//TODO: Add validation in joi
/**
 * Add flight
 */
router.post('/', async ({ body }, res) => {
  try {
    const create = createBody(body)

    const flight = new Flight(create)

    flight.save()

    res.send({
      message: 'The flight has been successfully saved',
      details: flight
    })
  } catch (error) {
    res.status(400).json(error)

    throw error
  }
})

// FIXME: delete query and add id  to body
/**
 * Edit flight
 */
router.put(
  '/update-flight',
  parser.parsePath,
  inputValidation.reqValidation,
  async ({ body }, res) => {
    try {
      const { id } = body

      const flight = await Flight.findById(id)

      if (!flight) throw new Error('No flight')

      // Update statement
      const mongoQuery = queries.updateFlight({ data: body, id: flight._id })

      // Update
      await Flight.updateOne(mongoQuery.filter, mongoQuery.update)

      res.send({
        message: 'The flight has been successfully updated',
        details: createBody(body)
      })
    } catch (error) {
      console.log(error)
      res.status(400).json(message.error(error))
    }
  }
)

/**
 * Delete flight
 */
router.delete('/delete', async (req, res) => {
  try {
    const { id } = req.query

    const flight = await Flight.findById(id)

    if (!flight) throw new Error('No flights')

    // Delete
    await Flight.deleteOne({ id })

    res.send({
      message: 'The flight has been successfully deleted',
      details: flight
    })
  } catch (error) {
    res.status(400).json({
      error: {
        name: error.name,
        message: error.message
      }
    })

    throw error
  }
})

module.exports = router
