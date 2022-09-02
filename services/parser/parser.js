const cache = require('memory-cache')

exports.parsePath = ({ route }, res, next) => {
  const { path } = route

  switch (path) {
    case '/edit-account':
      cache.put('UPDATE_PROFILE')

    case '/delete-my-flight':
    case '/delete-account':
      cache.put('DELETE')

    case '/register':
      cache.put('CREATE_ACCOUNT')

    case '/update-flight':
      cache.put('UPDATE_FLIGHT')

    case '/edit-my-flight':
      cache.put('UPDATE_TICKET')

    case '/delete-account':
      cache.put('DELETE_PROFILE')

    case '/get-my-flights':
      cache.put('GET_FLIGHTS')

    case '/get-my-tickets':
      cache.put('GET_TICKETS')

    case '/profile':
      cache.put('MY_PROFILE')

    case '/get-all-users':
      cache.put('GET_ALL_USERS')

    default:
      break
  }

  next()
}
