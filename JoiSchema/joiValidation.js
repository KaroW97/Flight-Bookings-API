const message = require('../utils/message')
const { chooseSchema } = require('./joiSchemas')

const joiValidate = (data, schema) => schema.validate(data)

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

    if (validate.error) throw new Error(validate.error)

    next()
  } catch (error) {
    res.send(message.error(error))
  }
}

module.exports = {
  reqValidation
}
