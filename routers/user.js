const { Router } = require('express')
const router = Router()
const inputValidation = require('../JoiSchema/joiValidation')
const { userController } = require('../controllers/index')
const parser = require('../services/parser/parser')

// TODO: Need to add hashing of the password. Would be nice
//to have separate module for that as its used in verios plases

/**
 * Get my account info
 */
router.get('/profile', parser.parsePath, userController.profile)

/**
 * Edit account
 */
router.put(
  '/edit-account',
  parser.parsePath,
  inputValidation.reqValidation,
  userController.editAccount
)

/**
 * Delete account
 */
router.delete('/delete-account', parser.parsePath, userController.deleteAccount)

/**
 * Get booked flights (MORE THEN ONE)
 */
router.get('/get-my-flights', parser.parsePath, userController.getFlights)

/**
 * Get booked flights (MORE THEN ONE)
 */
router.get('/get-my-tickets', parser.parsePath, userController.getTickets)

/**
 * Edit booked flight
 * User can update rank of his ticket
 */
router.put(
  '/edit-my-flight',
  parser.parsePath,
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
  parser.parsePath,
  inputValidation.reqValidation,
  userController.deleteFlight
)

module.exports = router
