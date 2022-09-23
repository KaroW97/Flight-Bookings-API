const { message } = require('../../utils/index')

exports.logout = (req, res) => {
  req.logOut((err) => err)
  res.json(message.success())
}
