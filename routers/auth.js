const router = require('express').Router()
const inputValidation = require('../JoiSchema/joiValidation')
const { authController, parserController } = require('../controllers/index')

//TODO: DELETE SHOWING PASSWORD TO FRONT
router.post('/login', authController.loginAuthentication)

router.get('/login', authController.login)

router.post(
  '/register',
  parserController.parsePath,
  inputValidation.reqValidation,
  authController.registration
)

router.delete('/logout', parserController.parsePath, authController.logout)

module.exports = router
