const { chooseSchema } = require('./joiSchemas')

const joiValidate = (data, schema) => schema.validate(data)

const reqValidation = ({ user, body }, res, next) => {
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
}

module.exports = {
  reqValidation
}
