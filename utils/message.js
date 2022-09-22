const cache = require('memory-cache')
const { deleteUndefined } = require('./common')

const getCacheKey = () => cache.keys()[0]

const clearCache = () => cache.clear()

const createMessage = (message, details) => {
  return deleteUndefined({
    message: message,
    length: details ? details.length : undefined,
    details
  })
}

const chooseMessage = (details) => {
  const type = getCacheKey()

  clearCache()

  let messageData
  // TODO: Add object holding all messages like update and so on

  switch (type) {
    case 'UPDATE_PROFILE':
    case 'DELETE_PROFILE':
      messageData = type === 'UPDATE_PROFILE' ? 'updated' : 'deleted'
      return createMessage(`The user has been ${messageData}`, details)

    case 'GET_TICKETS':
    case 'GET_FLIGHTS':
      messageData = type === 'GET_TICKETS' ? 'tickets' : 'flights'
      return createMessage(`All ${messageData}`, details)

    case 'DELETE_FLIGHT':
    case 'DELETE_ACCOUNT':
      messageData = type === 'DELETE_FLIGHT' ? 'Flight' : 'Account'
      return createMessage(`${messageData} has been deleted`, details)

    case 'CREATE_ACCOUNT':
    case 'CREATE_FLIGHT':
      messageData = type === 'CREATE_ACCOUNT' ? 'user' : 'flight'
      return createMessage(`New ${messageData} has been created`, details)

    case 'UPDATE_TICKET':
    case 'UPDATE_FLIGHT':
      messageData = type === 'UPDATE_TICKET' ? 'ticket' : 'flight'
      return createMessage(`The ${messageData} has been updated`, details)

    case 'BOOK_FLIGHT':
      return createMessage('Booked Flight', details)

    case 'MY_PROFILE':
      return createMessage('My Profile', details)

    case 'GET_ALL_USERS':
      return createMessage('All users found', details)

    case 'USER_LOGOUT':
      return createMessage('User has been logout')
  }
}

exports.success = (details) => chooseMessage(details)

exports.error = (error) => ({
  error: {
    status: error.status,
    name: error.name,
    message: error.message
  }
})
