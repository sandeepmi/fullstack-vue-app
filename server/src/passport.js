const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./models/User')
const config = require('./config')

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
  }

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.userId, function (err, user) {
      if (err) return done(err, false)

      done(null, user || false)
    })
  }))
}
