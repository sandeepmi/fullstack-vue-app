const path = require('path')
let Item = require('./models/Item')

module.exports = (app, passport) => {
  app.post('/login',
    passport.authenticate('local', {
      failureRedirect: '/login#401',
      failureFlash: true
    }),
    function (req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.redirect(req.session.redirectUrl || '/')
    }
  )

  app.get('/items', isLoggedIn, function (req, res) {
    console.log('session', req.session)
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/login')
  })

  app.post('/api/login',
    passport.authenticate('basic', { session: true }),
    function (req, res) {
      res.json(req)
    }
  )

  /*
    GET /api/items
    GET /api/items/:id
    POST /api/items
    PUT /api/items/:id
    DELETE /api/items/:id
  */
  Item = app.resource = Item.methods(['get', 'post', 'put', 'delete'])
  Item.register(app, '/api/items')

  // client routes
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
}

// route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next()

  req.session.redirectUrl = req.url

  // if they aren't redirect them to the login page
  res.redirect('/login')
}
