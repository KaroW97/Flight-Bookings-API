const { validation } = require('../validation/index')
const router = require('express').Router()
const {
  flightController,
  parserController,
  adminController,
  bodyController
} = require('../controllers/index')

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
  validation.reqValidation,
  flightController.bookFlight
)

// ADMIN
/**
 * Get all flights
 */
router.get(
  '/get-all-flights',
  validation.checkIfAdmin,
  parserController.parsePath,
  adminController.getAllFlights
)

/**
 * Get flight
 */
router.get(
  '/get-flight',
  validation.checkIfAdmin,
  parserController.parsePath,
  adminController.getFlight
)

/**
 * Add flight
 */
router.post(
  '/add-new-flight',
  validation.checkIfAdmin,
  parserController.parsePath,
  bodyController.createBody,
  validation.reqValidation,
  adminController.addNewFlight
)

/**
 * Update flight
 */
router.put(
  '/update-flight',
  validation.checkIfAdmin,
  parserController.parsePath,
  validation.reqValidation,
  adminController.updateFlight
)

/**
 * Delete flight
 */
router.delete(
  '/delete-flight',
  validation.checkIfAdmin,
  parserController.parsePath,
  validation.reqValidation,
  adminController.deleteFlight
)

module.exports = router
