const message = require('../../utils/message')

exports.profile = ({ user }, res) => res.send(message.success(user))
