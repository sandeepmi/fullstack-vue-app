const Item = require('./models/Item')

module.exports = (app) => {
  app.get('/api/getItems', (req, res) => {
    Item.find().exec((error, items) => {
      if (error) {
        console.error(error)
      }
      res.send(items)
    })
  })
}
