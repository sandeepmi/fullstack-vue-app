const path = require('path')
const Item = require('./models/Item')

module.exports = (app) => {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  app.get('/api/getItems', (req, res) => {
    Item.find().exec((error, items) => {
      if (error) {
        console.error(error)
      }
      res.send(items)
    })
  })
}
