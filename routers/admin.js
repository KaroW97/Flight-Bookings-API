const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const { updateUser } = require('../services/mongo/queryUtils')
const bcrypt = require('bcrypt')
const { reqValidation } = require('../JoiSchema/joiValidation')

//TODO: Add deletion of the flihts booked by the user to release data
/**
 * Get users account
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'User' })

    if (!users) return res.send({ message: 'There is no users to be found' })

    res.send({
      message: 'All users found',
      length: users.length,
      details: users
    })
  } catch (error) { }
})

/**
 * Edit user account
 */
router.put('/update', async (req, res) => {
  try {
    const {
      user: { role },
      body
    } = req

    reqValidation({ ...body, action_type: 'UPDATE_PROFILE', role })

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const data = { data: body, password: hashedPassword }

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
})

/**
 * Delete user account
 */
router.delete('/delete', async ({ body: { id } }, res) => {
  try {
    reqValidation({ id, action_type: 'DELETE_ACCOUNT' })

    const userDelete = await User.findOneAndDelete({ id })

    if (!userDelete)
      return res.send({ message: 'No user with given id was found' })

    res.send({
      message: 'User has been deleted',
      details: userDelete
    })
  } catch (error) {
    res.status(400).json({
      error: {
        name: error.name,
        message: error.message
      }
    })
  }
})

module.exports = router
