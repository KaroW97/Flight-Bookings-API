const { userService, hashService } = require('../../services/index')
const { message, errors } = require('../../utils/index')
const { validation } = require('../../validation/index')

exports.editAccount = async ({ body }, res) => {
  try {
    const { id } = body || {}

    const data = body

    validation.checkIfDataUpdate(body)

    const userToUpdate = await userService.findUserById(id)

    if (body.password) {
      data.password = await hashService.hashPassword(body, userToUpdate)
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
