const { userService } = require('../../services/index')
const { message } = require('../../utils/index')
const bcrypt = require('bcrypt')

exports.registration = async ({ body }, res) => {
  try {
    const { password, name, role, email, phone } = body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
      name,
      role,
      email,
      phone,
      password: hashedPassword
    }

    await userService.createUser(user)

    res.send(message.success(user))
  } catch (error) {
    console.log(error)
    res.status(400).json(message.error(error))
  }
}
