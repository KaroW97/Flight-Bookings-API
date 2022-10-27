module.exports = {
  bodyController: require('./common/createBody'),
  parserController: require('./parser/parser'),
  flightController: require('./flight/index'),
  adminController: require('./admin/index'),
  userController: require('./user/index'),
  authController: require('./auth/index')
}
