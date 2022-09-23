const { message } = require('../../utils/index')

exports.profile = ({ user }, res) => res.send(message.success(user))
