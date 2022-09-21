const bcrypt = require('bcrypt')
const User = require('../../models/User')
const message = require('../../utils/message')
const userService = require('../../services/user')

exports.registration = async ({ body }, res) => {
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
    await userService.create(user)

    res.send(message.success(user))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
