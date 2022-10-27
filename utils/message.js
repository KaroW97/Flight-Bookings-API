const cache = require('memory-cache')
const common = require('./common')

const getCacheKey = () => cache.keys()[0]

const clearCache = () => cache.clear()

const messages = {
  UPDATE_PROFILE: 'The user has been updated',
  DELETE_PROFILE: 'The user has been deleted',
  GET_TICKETS: 'All tickets',
  GET_FLIGHTS: 'All flights',
  DELETE_FLIGHT: 'Flight has been deleted',
  DELETE_ACCOUNT: 'Account has been deleted',
  CREATE_ACCOUNT: 'New user has been created',
  CREATE_FLIGHT: 'New flight has been created',
  UPDATE_TICKET: 'The ticket has been updated',
  UPDATE_FLIGHT: 'The flight has been updated',
  BOOK_FLIGHT: 'Booked Flight',
  MY_PROFILE: 'My Profile',
  GET_ALL_USERS: 'All users found',
  USER_LOGOUT: 'User has been logout'
}

const createMessage = (type, details) => {
  if (details.password) details.password = undefined

  return common.deleteUndefined({
    message: messages[type],
    length: details ? details.length : undefined,
    details
  })
}

const chooseMessage = (details) => {
  const type = getCacheKey()

  clearCache()

  return createMessage(type, details)
}

exports.success = (details) => chooseMessage(details)

exports.error = (error) => ({
  error: {
    status: error.status,
    name: error.name,
    message: error.message
  }
})
