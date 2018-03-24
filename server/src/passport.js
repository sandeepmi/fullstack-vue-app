const LocalStrategy = require('passport-local').Strategy
const BasicStrategy = require('passport-http').BasicStrategy
const User = require('./models/User')

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    console.log('serialize', user.id)
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserialize', user.id)
      done(err, user)
    })
  })

  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        console.log('valid?')
        if (err) { return done(err) }
        if (!user) {
          console.log('no user')
          return done(null, false, { message: 'Incorrect username.' })
        }
        if (!user.validPassword(password)) {
          console.log('invalid password')
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user);
      })
    }
  ))

  passport.use('basic', new BasicStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) return done(err)
        if (!user) return done(null, false)

        if (!user.validPassword(password)) {
          return done(null, false)
        }

        return done(null, user)
      })
    }
  ))
}
