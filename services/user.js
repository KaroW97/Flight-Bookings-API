const queryUtils = require('./mongo/queryUtils')
const User = require('../models/User')
const { createDetails } = require('../utils/common')

exports.updateAccount = async (data, id) => {
  const { filter, update } = queryUtils.updateUser({ data, id })

  await User.updateOne(filter, update)
}

exports.deleteItemFromBookedArray = async (userId, id) => {
  const { filter, update } = queryUtils.deleteItemFromArray(userId, id)

  const deleteTicket = await User.updateOne(filter, update)

  if (deleteTicket.modifiedCount === 0)
    throw new Error('Ticket does not exist in booked_tickets array')
}

exports.findByIdAndDelete = (userId) => User.findByIdAndDelete(userId)
