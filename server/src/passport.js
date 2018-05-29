const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./models/User')
const config = require('./config')

module.exports = function (passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
    passReqToCallback: true
  }

  passport.use(new JwtStrategy(opts, function (req, jwtPayload, done) {
    User.findById(jwtPayload.userId, function (err, user) {
      if (err) return done(err, false)

      // verify user, ip address and user agent
      if (user &&
        // jwtPayload.ip === req.ip &&
        jwtPayload.agent === req.headers['user-agent']
      ) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
