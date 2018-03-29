const path = require('path')
const itemRoutes = require('./items')
const authRoutes = require('./auth')
const userRoutes = require('./user')

module.exports = (app, passport) => {
  // item routes
  itemRoutes(app)

  // auth routes
  app.use('/api/auth', authRoutes)

  // user routes
  app.use('/api/user', passport.authenticate('jwt', { session: false }), userRoutes)

  // client app routes
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
}
