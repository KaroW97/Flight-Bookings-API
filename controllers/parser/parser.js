const cache = require('memory-cache')

exports.parsePath = ({ route }, res, next) => {
  const { path } = route

  switch (path) {
    case '/edit-account':
      cache.put('UPDATE_PROFILE')

    case '/delete-my-flight':
    case '/delete-flight':
      cache.put('DELETE_FLIGHT')

    case '/delete-account':
      cache.put('DELETE_ACCOUNT')

    case '/register':
      cache.put('CREATE_ACCOUNT')

    case '/update-flight':
      cache.put('UPDATE_FLIGHT')

    case '/edit-my-flight':
      cache.put('UPDATE_TICKET')

    case '/delete-account':
      cache.put('DELETE_PROFILE')

    case '/get-my-flights':
    case '/get-all-flights':
    case '/available-flights':
    case '/get-flight':
      cache.put('GET_FLIGHTS')

    case '/book-flight':
      cache.put('BOOK_FLIGHT')

    case '/add-new-flight':
      cache.put('CREATE_FLIGHT')

    case '/get-my-tickets':
      cache.put('GET_TICKETS')

    case '/profile':
      cache.put('MY_PROFILE')

    case '/get-all-users':
      cache.put('GET_ALL_USERS')

    case '/logout':
      cache.put('USER_LOGOUT')

    default:
      break
  }

  next()
}
