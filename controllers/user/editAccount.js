const hashService = require('../../services/hash')
const userService = require('../../services/user')
const message = require('../../utils/message')

exports.editAccount = async ({ body, user }, res) => {
  try {
    const { id } = user

    body.password = await hashService.hashPassword(body, user)

    await userService.updateAccount(body, id)

    res.send(message.success(id))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
