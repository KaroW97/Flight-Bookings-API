const bcrypt = require('bcrypt')

exports.hashPassword = async (data, user) => {
  if (!data.password) return user.password

  const checkIfSame = await bcrypt.compare(data.password, user.password)

  if (checkIfSame) throw new Error('New password is the same as old one')

  const hashedPassword = await bcrypt.hash(data.password, 10)

  return hashedPassword
}

exports.comparePasswords = async (newPassword, oldPassword) => {
  await bcrypt.compare(newPassword, oldPassword)
}
