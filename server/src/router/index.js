const path = require('path')
const itemRoutes = require('./items')
const authRoutes = require('./auth')
const authProtectedRoutes = require('./authProtected')
const userRoutes = require('./user')

module.exports = (app, passport) => {
  // item routes
  itemRoutes(app)

  // auth routes
  app.use('/api/auth', authRoutes)

  // auth protected routes
  app.use('/api/auth', passport.authenticate('jwt', { session: false }), authProtectedRoutes)

  // user routes
  app.use('/api/user', passport.authenticate('jwt', { session: false }), userRoutes)

  // client app routes
  app.get([
    '/',
    '/items',
    '/login',
    '/logout',
    '/my-account'
  ], function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
  })

  // client app 404/not found routes
  app.get('/*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname, '../../public/index.html'))
  })
}
