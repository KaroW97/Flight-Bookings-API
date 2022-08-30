const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = Router()
const passport = require('passport')
const { reqValidation } = require('../JoiSchema/joiValidation')

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
    res.send('LOGIN PAGE')
  } catch (error) {
    console.error(error)
  }
})

router.post('/register', async ({ body }, res) => {
  try {
    const { password, name, role, email, phone } = body

    const hashedPassword = await bcrypt.hash(password, 10)

    reqValidation({ ...body, action_type: 'CREATE_ACCOUNT' })

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
})

router.delete('/logout', (req, res) => {
  req.logOut((err) => err)
  res.json({
    message: 'logout'
  })
})

module.exports = router
