const Joi = require('joi')

const common = require('../common')

const flightSchema = Joi.object({
  action_type: Joi.string().required(),
  start_date_time: Joi.date().min(common.setMinimalTime()).required(),
  end_date_time: Joi.date().min(common.setMinimalTime(15)).required(),
  departure_point: Joi.string().required(),
  destination_point: Joi.string().required(),
  ticket_prices: Joi.array().required(),
  total_ticket_number: Joi.number().min(0).max(100).required(),
  number_of_available_tickets: Joi.number().min(0).max(100).required(),
  date_of_creation: Joi.date().min(common.setMinimalTime()).required()
})

const flightSchemaUpdate = Joi.object({
  action_type: Joi.string().required(),
  start_date_time: Joi.date().min(common.setMinimalTime()),
  end_date_time: Joi.date().min(common.setMinimalTime(15)),
  departure_point: Joi.string(),
  destination_point: Joi.string(),
  ticket_prices: Joi.array(),
  total_ticket_number: Joi.number().min(0).max(100),
  number_of_available_tickets: Joi.number().min(0).max(100),
  date_of_creation: Joi.date().min(common.setMinimalTime())
})

const userUpdateProfile = Joi.object({
  id: Joi.alternatives().conditional('role', {
    is: 'Admin',
    then: Joi.string().required()
  }),
  action_type: Joi.string().required(),
  name: Joi.string().trim(),
  role: Joi.string(),
  phone: Joi.string().trim(),
  email: Joi.string().trim(),
  password: Joi.string().min(6).max(12),
  booked_tickets: Joi.any().forbidden()
})

const createUser = Joi.object({
  action_type: Joi.string().required(),
  name: Joi.string().trim().required(),
  role: Joi.string().valid('User', 'Admin'),
  phone: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  password: Joi.string().min(6).max(12).required()
})

const deleteUser = Joi.object({
  action_type: Joi.string().required(),
  id: Joi.string().length(24)
})

const updateFlight = Joi.object({
  action_type: Joi.string().required(),
  id: Joi.string().length(24).required(),
  rank: Joi.string().valid('Economy', 'Business', 'Deluxe').required()
})

const chooseSchema = (actionType) => {
  switch (actionType) {
    case 'UPDATE':
      return flightSchemaUpdate
    case 'UPDATE_PROFILE':
      return userUpdateProfile
    case 'CREATE_ACCOUNT':
      return createUser
    case 'DELETE_ACCOUNT':
      return deleteUser
    case 'UPDATE_TICKET':
      return updateFlight
    default:
      return flightSchema
  }
}
module.exports = {
  flightSchema,
  flightSchemaUpdate,
  chooseSchema
}
