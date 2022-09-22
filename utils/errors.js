/**
 * When incorrect data provided
 */
class BadRequestError extends Error {
  constructor(details) {
    super('BAD_REQUEST')
    this.status = 400
    this.name = 'BAD_REQUEST'
    this.message = details
  }
}

/**
 * No data for provided Id
 */
class NotFoundError extends Error {
  constructor(details = 'Page could not be found') {
    super('NOT_FOUND')

    this.status = 404
    this.name = 'NOT_FOUND'
    this.message = details
  }
}

class UpdateError extends NotFoundError {
  constructor() {
    super('No data to be updated found')
  }
}

class FlightError extends NotFoundError {
  constructor() {
    super('There is no flight to be found')
  }
}

class TicketError extends NotFoundError {
  constructor() {
    super('There is no ticket to be found')
  }
}

class TicketHistoryError extends NotFoundError {
  constructor() {
    super('Ticket does not exist in booked_tickets array')
  }
}

class UserError extends NotFoundError {
  constructor() {
    super('There is no users to be found')
  }
}

/**
 * Data Already exists
 */
class MongoServerError extends Error {
  constructor(details = 'Duplication or bad syntax error') {
    super('CONFLICT')
    this.status = 409
    this.name = 'CONFLICT'
    this.message = details
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  FlightError,
  MongoServerError,
  UpdateError,
  UserError,
  TicketError,
  TicketHistoryError
}
