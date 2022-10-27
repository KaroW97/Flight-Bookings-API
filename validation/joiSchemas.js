const { common } = require('../utils/index')
const cache = require('memory-cache')
const Joi = require('joi')

const flightSchema = Joi.object({
  role: Joi.string().valid('Admin'),
  start_date_time: Joi.date().min(common.setMinimalTime()).required(),
  end_date_time: Joi.date().min(common.setMinimalTime(15)).required(),
  departure_point: Joi.string().required(),
  destination_point: Joi.string().required(),
  ticket_prices: Joi.object().required(),
  total_ticket_number: Joi.number().min(0).max(100).required(),
  number_of_available_tickets: Joi.number().min(0).max(100).required(),
  date_of_creation: Joi.date().min(common.setMinimalTime()).required()
})

const flightSchemaUpdate = Joi.object({
  id: Joi.string().length(24),
  role: Joi.string().valid('Admin'),
  start_date_time: Joi.date().min(common.setMinimalTime()),
  end_date_time: Joi.date().min(common.setMinimalTime(15)),
  departure_point: Joi.string(),
  destination_point: Joi.string(),
  ticket_prices: Joi.object(),
  total_ticket_number: Joi.number().min(0).max(100),
  number_of_available_tickets: Joi.number().min(0).max(100)
})

const userUpdateProfile = Joi.object({
  id: Joi.alternatives().conditional('role', {
    is: 'Admin',
    then: Joi.string().required()
  }),
  name: Joi.string().trim(),
  role: Joi.string(),
  phone: Joi.string().trim(),
  email: Joi.string().trim(),
  password: Joi.string().min(6).max(12),
  booked_tickets: Joi.any().forbidden()
})

const createUser = Joi.object({
  name: Joi.string().trim().required(),
  role: Joi.string().valid('User', 'Admin'),
  phone: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  password: Joi.string().min(6).max(12).required()
})

const deleteValidation = Joi.object({
  id: Joi.string().length(24),
  role: Joi.string().valid('User', 'Admin')
})

const updateTicket = Joi.object({
  id: Joi.string().length(24).required(),
  rank: Joi.string().valid('Economy', 'Business', 'Deluxe').required(),
  role: Joi.string().valid('User')
})

const bookFlight = Joi.object({
  tickets: {
    Economy: Joi.number().optional(),
    Business: Joi.number().optional(),
    Deluxe: Joi.number().optional()
  },
  role: Joi.string().valid('User')
})

const chooseSchema = () => {
  const type = cache.keys()[0]

  switch (type) {
    case 'UPDATE_FLIGHT':
      return flightSchemaUpdate
    case 'UPDATE_PROFILE':
      return userUpdateProfile
    case 'CREATE_ACCOUNT':
      return createUser
    case 'DELETE_FLIGHT':
    case 'DELETE_ACCOUNT':
      return deleteValidation
    case 'UPDATE_TICKET':
      return updateTicket
    case 'CREATE_FLIGHT':
      return flightSchema
    case 'BOOK_FLIGHT':
      return bookFlight
  }
}
module.exports = {
  chooseSchema
}
