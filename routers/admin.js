const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const { updateUser } = require('../services/mongo/queryUtils')
const bcrypt = require('bcrypt')
const inputValidation = require('../JoiSchema/joiValidation')
const parser = require('../services/parser/parser')
const message = require('../utils/message')
const { adminController } = require('../controllers/index')

// TODO: Add deletion of the flihts booked by the user to release data
/**
 * Get users account
 */
router.get('/get-all-users', parser.parsePath, adminController.getAllUsers)

/**
 * Edit user account
 */
router.put(
  '/edit-account',
  parser.parsePath,
  inputValidation.reqValidation,
  async (req, res) => {
    try {
      const { user, body } = req
      const { name, phone, email, password } = body || {}

      const data = {}
      if (!name && !phone && !email && !password)
        throw new Error('No data to update')

      if (body.password) {
        const hashedPassword = await bcrypt.hash(body.password, 10)
        data.password = hashedPassword
      }

      data.data = body

      const { filter, update } = updateUser(data)

      const userUpdate = await User.findOneAndUpdate(filter, update)

      if (!userUpdate)
        return res.send({ message: 'No user with given id was found' })

      res.send({
        message: 'User has been updated',
        details: userUpdate
      })
    } catch (error) {
      if (error.codeName === 'DuplicateKey') {
        res.status(400).json({ error: new Error('Duplication') })

        throw new Error('Duplication')
      }
      res.status(400).json({
        error: {
          name: error.name,
          message: error.message
        }
      })
    }
  }
)

/**
 * Delete user account
 */
router.delete(
  '/delete-account',
  parser.parsePath,
  inputValidation.reqValidation,
  adminController.deleteAccount
  /* async ({ body: { id } }, res) => {
    try {
      const userDelete = await User.findOneAndDelete({ id })

      if (!userDelete)
        return res.send({ message: 'No user with given id was found' })

      res.send({
        message: 'User has been deleted',
        details: userDelete
      })
    } catch (error) {
      res.status(400).json(message.error(error))
    }
  } */
)

module.exports = router
