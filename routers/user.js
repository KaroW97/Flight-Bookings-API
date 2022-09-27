const { validation } = require('../validation/index')
const router = require('express').Router()
const {
  userController,
  parserController,
  adminController
} = require('../controllers/index')

/**
 * Get my account info
 */
router.get('/profile', parserController.parsePath, userController.profile)

/**
 * Edit account
 */
router.put(
  '/edit-my-account',
  parserController.parsePath,
  validation.reqValidation,
  userController.editAccount
)

/**
 * Delete account
 */
router.delete(
  '/delete-my-account',
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
  validation.reqValidation,
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
  validation.reqValidation,
  userController.deleteFlight
)

// ADMIN

/**
 * Get users account
 */
router.get(
  '/get-all-users',
  validation.checkIfAdmin,
  parserController.parsePath,
  adminController.getAllUsers
)

/**
 * Edit user account
 */
router.put(
  '/edit-account',
  validation.checkIfAdmin,
  parserController.parsePath,
  validation.reqValidation,
  adminController.editAccount
)

/**
 * Delete user account
 */
router.delete(
  '/delete-account',
  validation.checkIfAdmin,
  parserController.parsePath,
  validation.reqValidation,
  adminController.deleteAccount
)

module.exports = router
