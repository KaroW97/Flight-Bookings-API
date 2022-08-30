const { Router } = require('express')
const router = Router()
const { updateUser, findTicketsById } = require('../services/mongo/queryUtils')
const bcrypt = require('bcrypt')
const { reqValidation } = require('../JoiSchema/joiValidation')

const User = require('../models/User')
const Flight = require('../models/Flight')
const Ticket = require('../models/Ticket')
const { createItem, createDetails } = require('../common')
/**
 * Get my account info
 */
router.get('/profile', (req, res) => {
  res.json({
    message: 'My Profile',
    user: req.user
  })
})

// TODO: Need to add hashing of the password. Would be nice
//to have separate module for that as its used in verios plases
/**
 * Edit account
 */
router.put('/edit-account', async ({ user, body }, res) => {
  try {
    reqValidation({ ...body, action_type: 'UPDATE_PROFILE' })

    let data = body

    if (body.password) {
      const checkIfSame = await bcrypt.compare(body.password, user.password)

      if (checkIfSame)
        return res.send({ message: 'New password is the same as old one' })

      const hashedPassword = await bcrypt.hash(body.password, 10)

      data.password = hashedPassword
    }

    const { filter, update } = updateUser({ data, id: user.id })

    await User.updateOne(filter, update)

    res.send({
      message: 'The user has been updated',
      details: `User id: ${user.id}`
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      error: {
        name: error.name,
        message: error.message
      }
    })
  }
})

/**
 * Delete account
 */
router.delete('/delete-account', async ({ user }, res) => {
  try {
    await User.findByIdAndDelete(user.id)

    res.send({
      message: 'The user has been deleted',
      details: `User id: ${user.id}`
    })
  } catch (error) {
    console.error(error)
    throw error
  }
})

//TODO: Add ability to sum al tickets
/**
 * Get booked flights (MORE THEN ONE)
 */
router.get('/get-my-flights', async ({ user, body }, res) => {
  try {
    const query = findTicketsById(user.booked_tickets)

    const tickets = await Ticket.find(query)

    const ticketsDetails = tickets.reduce((prev, curr, index) => {
      // Get first element from array
      const firstElem = prev[0] || undefined

      //Get id if first element exists
      const flightId = firstElem && firstElem.flightId._id.toString()

      // When first create new object
      if (index === 0) {
        prev.push(createItem(curr))

        return prev
      }

      // When id are align update existing element in array
      if (flightId === curr.flight._id.toString()) {
        firstElem.details.push(createDetails(curr))

        firstElem.totalPrice += curr.price

        firstElem.totalAmount += 1
        return prev
      }

      // When Id are different create new object and push it at the beginning of the array
      prev.unshift(createItem(curr))

      return prev
    }, [])

    res.send({ tickets: ticketsDetails })
  } catch (error) {
    console.log(error)
  }
})

/**
 * Get booked flights (MORE THEN ONE)
 */
router.get('/get-my-tickets', async ({ user }, res) => {
  try {
    const tickets = await Ticket.find({ user: user._id })

    const ticketsDetails = tickets.reduce((prev, flight, index) => {

      const firstElem = prev[0] || undefined

      if (index === 0) {
        prev.push(createDetails(flight, flight.flight))

        return prev
      }

      // When rank are align update existing element in array
      if (firstElem && flight.rank === firstElem.type && flight.flight.toString() === firstElem.flightId) {
        firstElem.AllTicketPrice += flight.price

        firstElem.amount += 1

        return prev
      }

      prev.unshift(createDetails(flight, flight.flight))

      return prev
    }, [])

    res.send({ tickets: ticketsDetails })
  } catch (error) {
    console.log(error)
  }
})

/**
 * Edit booked flight
 * User can update rank of his ticket
 */
router.put('/edit-my-flight', async ({ user, body }, res) => {
  try {
    const { id, rank } = body

    reqValidation({ ...body, action_type: 'UPDATE_TICKET' })

    const ticket = await Ticket.findById(id)

    if (!ticket) throw new Error('No ticket')

    const flight = await Flight.findByIdAndUpdate(ticket.flight, {
      $inc: { [`ticket_prices.${rank}.amount`]: - 1, [`ticket_prices.${ticket.rank}.amount`]: 1 }
    })

    if (!flight) throw new Error('No flight')


    await ticket.updateOne({ rank, price: flight.ticket_prices[rank].price })

    res.send(flight)
  } catch (error) {
    res.json({
      error: {
        name: error.name,
        message: error.message
      }
    })
  }
})

/**
 * Delete booked flight
 * Deletes one ticket for a flight,
 * but does not increase number of ticket per flight in Flight collection
 */
router.delete('/delete-my-flight', async ({ user, body }, res) => {
  try {
    const { id } = body

    const ticket = await Ticket.findById(id)

    if (!ticket) throw new Error('Ticket not found')

    const test = await User.updateOne({ _id: user.id, booked_tickets: id }, {
      $pull: { booked_tickets: id }
    })

    if (test.modifiedCount === 0) throw new Error('Ticket does not exist in booked_tickets array')

    await ticket.delete()

    res.send({
      message: 'Ticket deleted',
      details: ticket
    })
  } catch (error) {
    res.status(404).send({
      error: {
        name: error.name,
        message: error.message
      }
    })

    throw error
  }
})

module.exports = router
