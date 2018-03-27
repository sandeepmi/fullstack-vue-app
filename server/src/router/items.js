let Item = require('../models/Item')

module.exports = (app) => {
  /*
    GET /api/items
    GET /api/items/:id
    POST /api/items
    PUT /api/items/:id
    DELETE /api/items/:id
  */
  Item = app.resource = Item.methods(['get', 'post', 'put', 'delete'])
  Item.register(app, '/api/items')
}
