const { chooseSchema } = require('./joiSchemas')
const { message } = require('../utils/index')

const joiValidate = (data, schema) => schema.validate(data)

const checkIfAdmin = (req, res, next) => {
  if (req.user && req.user.role !== 'Admin')
    return res.json({ message: 'Access denied' })

  if (req.isAuthenticated()) return next()

  res.json({ message: 'Need to log in' })
}

const reqValidation = ({ user, body }, res, next) => {
  try {
    let newBody

    if (user) {
      newBody = {
        ...body,
        role: user.role
      }
    }

    const validate = joiValidate(newBody ?? body, chooseSchema())

    if (validate.error) throw validate.error

    next()
  } catch (error) {
    res.send(message.error(error))
  }
}

module.exports = {
  reqValidation,
  checkIfAdmin
}
