const LocalStrategy = require('passport-local').Strategy
const { User } = require('./models/User')
const bcrypt = require('bcrypt')

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email })

    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) return done(null, user)
      else return done(null, false, { message: 'Password incorrect' })
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser(async (id, done) => {
    const getUserById = await User.findById(id)

    return done(null, getUserById)
  })
}

module.exports = initialize
