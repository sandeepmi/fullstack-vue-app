const path = require('path')
let Item = require('./models/Item')

module.exports = (app, passport) => {
  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login#401',
      failureFlash: true
    })
  )

  app.get('/items', isLoggedIn, function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })

  app.post('/api/login',
    passport.authenticate('basic', { session: true }),
    function(req, res) {
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
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next()

  // if they aren't redirect them to the login page
  res.redirect('/login')
}
