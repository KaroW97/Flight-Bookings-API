const router = require('express').Router()
const inputValidation = require('../JoiSchema/joiValidation')
const { userController, parserController } = require('../controllers/index')

// TODO: Need to add hashing of the password. Would be nice
//to have separate module for that as its used in verios plases

/**
 * Get my account info
 */
router.get('/profile', parserController.parsePath, userController.profile)

/**
 * Edit account
 */
router.put(
  '/edit-account',
  parserController.parsePath,
  inputValidation.reqValidation,
  userController.editAccount
)

/**
 * Delete account
 */
router.delete(
  '/delete-account',
  parserController.parsePath,
  userController.deleteAccount
)

/**
 * Get booked flights (MORE THEN ONE)
 */
router.get(
  '/get-my-flights',
  parserController.parsePath,
  userController.getFlights
)

/**
 * Get booked flights (MORE THEN ONE)
 */
router.get(
  '/get-my-tickets',
  parserController.parsePath,
  userController.getTickets
)

/**
 * Edit booked flight
 * User can update rank of his ticket
 */
router.put(
  '/edit-my-flight',
  parserController.parsePath,
  inputValidation.reqValidation,
  userController.editFlight
)

/**
 * Deletes booked flight
 * Deletes one ticket for a flight,
 * but does not increase number of ticket per flight in Flight collection
 */
router.delete(
  '/delete-my-flight',
  parserController.parsePath,
  inputValidation.reqValidation,
  userController.deleteFlight
)

module.exports = router
