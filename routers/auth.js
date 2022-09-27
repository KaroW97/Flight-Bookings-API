const { authController, parserController } = require('../controllers/index')
const { validation } = require('../validation/index')
const router = require('express').Router()

router.post('/login', authController.loginAuthentication)

router.get('/login', authController.login)

router.post(
  '/register',
  parserController.parsePath,
  validation.reqValidation,
  authController.registration
)

router.delete('/logout', parserController.parsePath, authController.logout)

module.exports = router
