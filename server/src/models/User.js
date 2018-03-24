const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// define the schema for our user model
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema)
