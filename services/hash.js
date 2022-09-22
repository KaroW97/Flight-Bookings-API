const bcrypt = require('bcrypt')
const validate = require('../validation/validation')

exports.hashPassword = async (data, user) => {
  if (!data.password) return user.password

  const compare = await bcrypt.compare(data.password, user.password)

  validate.validatePassword(compare)

  const hashedPassword = await bcrypt.hash(data.password, 10)

  return hashedPassword
}

exports.comparePasswords = async (newPassword, oldPassword) => {
  await bcrypt.compare(newPassword, oldPassword)
}
