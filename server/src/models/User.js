const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// define the schema for our user model
const userSchema = mongoose.Schema({
  email: String,
  password: String
})

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema)
