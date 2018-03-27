const path = require('path')
const itemRoutes = require('./items')
const authRoutes = require('./auth')

module.exports = (app, passport) => {
  // item routes
  itemRoutes(app)

  // auth routes
  app.use('/api/auth', authRoutes)

  // Protect dashboard route with JWT
  app.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.')
  })

  // client routes
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
}
