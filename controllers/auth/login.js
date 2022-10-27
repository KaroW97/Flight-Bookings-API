const { message } = require('../../utils/index')
const passport = require('passport')

exports.loginAuthentication = passport.authenticate('local', {
  successRedirect: '/user/profile',
  failureRedirect: '/login',
  failureFlash: true
})

exports.login = async (req, res) => {
  try {
    if (!req.user && req.session.flash) {
      res.send(message.error({ message: req.session.flash.error[0] }))
      return
    }

    res.redirect('/user/profile')
  } catch (error) {
    message.error(error)
  }
}
