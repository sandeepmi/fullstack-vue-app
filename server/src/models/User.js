const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Member', 'Admin'],
    default: 'Member'
  },
  profile: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  lastLoggedInDate: {
    type: Date
  },
  lastPasswordChangeDate: {
    type: Date
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordDate: {
    type: Date
  }
})

// encrypt password
UserSchema.pre('save', function (next) {
  const user = this
  const SALT_FACTOR = 10

  if (!user.isModified('password') && !this.isNew) return next()

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return next(err)

    next(null, isMatch)
  })
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema)
