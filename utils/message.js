const cache = require('memory-cache')

const getCacheKey = () => cache.keys()[0]

const clearCache = () => cache.clear()

//TODO: Change delete to delete_account and delete flight
const chooseMessage = (details) => {
  const type = getCacheKey()

  clearCache()

  let messageData
  //Add object holding all messages like update and so on
  //create mesage generator
  switch (type) {
    case 'UPDATE_PROFILE':
    case 'DELETE_PROFILE':
      messageData = type === 'UPDATE_PROFILE' ? 'updated' : 'deleted'
      return {
        message: `The user has been ${messageData}`,
        details: `User id: ${details}`
      }
    case 'GET_TICKETS':
    case 'GET_FLIGHTS':
      messageData = type === 'GET_TICKETS' ? 'tickets' : 'flights'
      return {
        message: `Sorted ${messageData}`,
        [messageData]: details
      }
    case 'DELETE':
      return {
        message: 'Deleted',
        ticket: details
      }

    case 'UPDATE_TICKET':
      return {
        message: 'Updated Ticket',
        details
      }

    case 'MY_PROFILE':
      return {
        message: 'My Profile',
        user: details
      }
    case 'GET_ALL_USERS':
      return {
        message: 'All users found',
        length: details.length,
        details: details
      }
    default:
      break
  }
}

exports.success = (details) => chooseMessage(details)

exports.error = (error) => ({
  error: {
    name: error.name,
    message: error.message
  }
})
