const { userService, hashService } = require('../../services/index')
const { message } = require('../../utils/index')

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
