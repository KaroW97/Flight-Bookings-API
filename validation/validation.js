const errors = require('../utils/errors')

exports.checkIfRankChanged = (newRank, currentRank) => {
  if (newRank === currentRank)
    throw new Error('Ticket rank is the same as previous')
}

exports.checkIfUserExists = (user) => {
  if (!user) throw new errors.UserError()
}

exports.checkIfTicketExists = (ticket) => {
  if (!ticket) throw new errors.TicketError()
}

exports.checkIfFlightExists = (ticket) => {
  if (!ticket) throw new errors.TicketError()
}

exports.checkIfTicketHistoryUpdated = (data) => {
  if (data.modifiedCount === 0) throw new errors.TicketHistoryError()
}

exports.validatePassword = (compared) => {
  if (compared)
    throw new errors.BadRequestError('New password is the same as old one')

}

exports.checkIfDataUpdate = ({ name, phone, email, password }) => {
  if (!name && !phone && !email && !password) throw new errors.UpdateError()
}
