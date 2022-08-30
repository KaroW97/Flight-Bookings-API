const { chooseSchema } = require('./joiSchemas')

const joiValidate = (data, schema) => {
  return schema.validate(data)
}

const reqValidation = (data) => {
  const validate = joiValidate(data, chooseSchema(data.action_type))
  console.log(validate)
  if (validate.error) throw new Error(validate.error)

  return validate.value
}

module.exports = {
  reqValidation
}
