module.exports = {
  userController: require('./user/index'),
  adminController: require('./admin/index'),
  authController: require('./auth/index'),
  flightController: require('./flight/index'),
  parserController: require('./parser/parser'),
  bodyController: require('./common/createBody')
}
