const { hashPassword } = require('../../services/hash')
const message = require('../../utils/message')
const errors = require('../../utils/errors')
const userService = require('../../services/user')
const validate = require('../../validation/validation')

exports.editAccount = async ({ body }, res) => {
  try {
    const { id } = body || {}

    const data = body

    validate.checkIfDataUpdate(body)

    const userToUpdate = await userService.findUserById(id)

    if (body.password) {
      data.password = await hashPassword(body, userToUpdate)
    }
    await userService.updateAccount(data)

    res.send(message.success({ ...userToUpdate._doc, ...data }))
  } catch (error) {
    if (error.code === 11000) {
      return res.send(message.error(new errors.MongoServerError()))
    }

    res.send(message.error(error))
  }
}
