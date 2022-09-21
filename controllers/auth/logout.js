const message = require('../../utils/message')

exports.logout = (req, res) => {
  req.logOut((err) => err)
  res.json(message.success())
}
