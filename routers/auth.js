const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = Router()
const passport = require('passport')
const inputValidation = require('../JoiSchema/joiValidation')
const parser = require('../services/parser/parser')

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
)

router.get('/login', async (req, res) => {
  try {
    if (!req.user && req.session.flash) {
      res.send({
        message: req.session.flash.error[0]
      })
      return
    }
    res.redirect('/user/profile')
  } catch (error) {
    console.error(error)
  }
})

router.post(
  '/register',
  parser.parsePath,
  inputValidation.reqValidation,
  async ({ body }, res) => {
    try {
      const { password, name, role, email, phone } = body

      const hashedPassword = await bcrypt.hash(password, 10)
      //TODO: Delete booked_tickets array for admin
      const user = {
        name,
        role,
        email,
        phone,
        password: hashedPassword
      }

      await User.create(user)

      res.send({
        message: 'New user was saved',
        details: user
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
  }
)

router.delete('/logout', (req, res) => {
  req.logOut((err) => err)
  res.json({
    message: 'logout'
  })
})

module.exports = router
