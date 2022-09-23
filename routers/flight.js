const router = require('express').Router()
const inputValidation = require('../validation/joiValidation')
const {
  flightController,
  parserController,
  adminController,
  bodyController
} = require('../controllers/index')

//TODO: Add data check if there is something to update
//TODO: FORBID GOING UNDER 0 WITH TICKETS

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

// ADMIN

/**
 * Get all flights
 */
router.get(
  '/get-all-flights',
  inputValidation.checkIfAdmin,
  parserController.parsePath,
  adminController.getAllFlights
)

/**
 * Get flight
 */
router.get(
  '/get-flight',
  inputValidation.checkIfAdmin,
  parserController.parsePath,
  adminController.getFlight
)

/**
 * Add flight
 */
router.post(
  '/add-new-flight',
  inputValidation.checkIfAdmin,
  parserController.parsePath,
  bodyController.createBody,
  inputValidation.reqValidation,
  adminController.addNewFlight
)

/**
 * Update flight
 */
router.put(
  '/update-flight',
  inputValidation.checkIfAdmin,
  parserController.parsePath,
  inputValidation.reqValidation,
  adminController.updateFlight
)

/**
 * Delete flight
 */
router.delete(
  '/delete-flight',
  inputValidation.checkIfAdmin,
  parserController.parsePath,
  inputValidation.reqValidation,
  adminController.deleteFlight
)

module.exports = router
