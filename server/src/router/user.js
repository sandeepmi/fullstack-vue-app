const express = require('express')
const User = require('../models/User')
const { isEmail } = require('../helpers/utils')

const userRoutes = express.Router()

// get profile
userRoutes.get('/profile', function (req, res) {
  const { firstName, lastName } = req.user.profile
  const { email } = req.user

  res.send({ firstName, lastName, email })
})

// update profile
userRoutes.post('/profile', function (req, res) {
  const { email, firstName, lastName } = req.body

  // validations
  // required fields
  if (!email || !firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'Please provide all required data' })
  }

  // email validation
  if (!isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email' })
  }

  // find user
  User.findById(req.user._id, function (err, user) {
    if (err) return res.status(500).json({})

    // set profile data
    user.email = email
    user.profile.firstName = firstName
    user.profile.lastName = lastName

    // save profile
    user.save(function (err) {
      if (err) return res.status(500).json({})

      res.json({ success: true, message: 'Successfully updated user profile' })
    })
  })
})

module.exports = userRoutes
