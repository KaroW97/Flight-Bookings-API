const { User, UserSchema } = require('../models/User')
const { validation } = require('../validation/index')
const { queryUtils } = require('../utils/index')

exports.createUser = (user) => {
  if (user.role !== 'Admin') UserSchema.emit('create_ticket_array')

  User.create(user)
}

exports.findUserById = (id) => User.findById(id)

exports.updateAccount = async (data, id) => {
  const { filter, update } = queryUtils.updateUser({ data, id })

  const userUpdate = await User.updateOne(filter, update)

  validation.checkIfUserExists(userUpdate)
}

exports.deleteItemFromBookedArray = async (userId, id) => {
  const { filter, update } = queryUtils.deleteItemFromArray(userId, id)

  const deleteTicket = await User.updateOne(filter, update)

  validation.checkIfTicketHistoryUpdated(deleteTicket)
}

exports.addNewTicketToUser = async (newTicket, _id) => {
  const { filter, update } = queryUtils.addNewTicketToUser({
    newTicket,
    _id
  })

  await User.updateOne(filter, update)
}

exports.findByIdAndDelete = (userId) => {
  const user = User.findByIdAndDelete(userId)

  validation.checkIfUserExists(user)

  return user
}

exports.getUsersByRole = async (role = 'User') => {
  const users = await User.find({ role })

  validation.checkIfUserExists(users.length)

  return users
}
