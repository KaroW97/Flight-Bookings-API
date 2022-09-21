const router = require('express').Router()
const inputValidation = require('../JoiSchema/joiValidation')

const { flightController, parserController } = require('../controllers/index')

//TODO: Add data check if there is something to update
//TODO: FORBID GOING UNDER 0 WITH TICKETS/
// FORMAT: get-my-flight?flight=id
// to get those params req.query.id

/**
 * Get available flight
 */
router.get(
  '/available-flights',
  parserController.parsePath,
  flightController.getAvailableFlights
)

/**
 * Book available flight ticket
 */
router.post(
  '/book-flight',
  parserController.parsePath,
  inputValidation.reqValidation,
  flightController.bookFlight
)

module.exports = router
