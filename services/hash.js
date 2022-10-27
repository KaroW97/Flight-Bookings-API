const { validation } = require('../validation/index')
const bcrypt = require('bcrypt')

exports.hashPassword = async (data, user) => {
  if (!data.password) return user.password

  const compare = await bcrypt.compare(data.password, user.password)

  validation.validatePassword(compare)

  const hashedPassword = await bcrypt.hash(data.password, 10)

  return hashedPassword
}

exports.comparePasswords = async (newPassword, oldPassword) => {
  await bcrypt.compare(newPassword, oldPassword)
}
