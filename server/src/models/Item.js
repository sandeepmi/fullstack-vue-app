const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  _id: String,
  title: String,
  type: String
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
