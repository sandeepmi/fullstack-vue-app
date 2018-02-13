const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema

const itemSchema = new Schema({
  title: String,
  type: String
})

const Item = restful.model('Item', itemSchema)

module.exports = Item
