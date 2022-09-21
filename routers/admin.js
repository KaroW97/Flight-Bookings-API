const router = require('express').Router()
const inputValidation = require('../JoiSchema/joiValidation')
const {
  adminController,
  parserController,
  bodyController
} = require('../controllers/index')

//TODO: Actions allowed only for flights that are allowed to be booked
//TODO: Add joi schema to validate coming values and add default value to the body

//TODO: Add validation in joi

/**
 * Get users account
 */
router.get(
  '/get-all-users',
  parserController.parsePath,
  adminController.getAllUsers
)

/**
 * Edit user account
 */
router.put(
  '/edit-account',
  parserController.parsePath,
  inputValidation.reqValidation,
  adminController.editAccount
)

/**
 * Delete user account
 */
router.delete(
  '/delete-account',
  parserController.parsePath,
  inputValidation.reqValidation,
  adminController.deleteAccount
)

/**
 * Get all flights
 */
router.get(
  '/get-all-flights',
  parserController.parsePath,
  adminController.getAllFlights
)

/**
 * Get flight
 */
router.get('/get-flight', parserController.parsePath, adminController.getFlight)

/**
 * Add flight
 */
router.post(
  '/add-new-flight',
  parserController.parsePath,
  bodyController.createBody,
  inputValidation.reqValidation,
  adminController.addNewFlight
)

router.put(
  '/update-flight',
  parserController.parsePath,
  inputValidation.reqValidation,
  adminController.updateFlight
)

/**
 * Delete flight
 */
router.delete(
  '/delete-flight',
  parserController.parsePath,
  inputValidation.reqValidation,
  adminController.deleteFlight
)

module.exports = router
