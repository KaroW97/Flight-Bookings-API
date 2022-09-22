const queryUtils = require('./mongo/queryUtils')
const User = require('../models/User')
const validate = require('../validation/validation')

exports.updateAccount = async (data, id) => {
  const { filter, update } = queryUtils.updateUser({ data, id })

  const userUpdate = await User.updateOne(filter, update)

  validate.checkIfUserExists(userUpdate)

}

exports.deleteItemFromBookedArray = async (userId, id) => {
  const { filter, update } = queryUtils.deleteItemFromArray(userId, id)

  const deleteTicket = await User.updateOne(filter, update)

  validate.checkIfTicketHistoryUpdated(deleteTicket)
}

exports.addNewTicketToUser = async (newTicket, _id) => {
  const { filter, update } = queryUtils.addNewTicketToUser({
    newTicket,
    _id
  })

  await User.updateOne(filter, update)
}

exports.createUser = (user) => User.create(user)

exports.findByIdAndDelete = (userId) => {
  const user = User.findByIdAndDelete(userId)

  validate.checkIfUserExists(user)

  return user
}

exports.findUserById = (id) => User.findById(id)

exports.getUsersByRole = async (role = 'User') => {
  const users = await User.find({ role })

  validate.checkIfUserExists(users.length)

  return users
}