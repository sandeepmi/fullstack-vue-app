const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
var config = require('../config')

// Create API group routes
var authRoutes = express.Router()

// Register new users
authRoutes.post('/register', function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' })
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    })

    // Attempt to save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.' })
      }
      res.json({ success: true, message: 'Successfully created new user.' })
    })
  }
})

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
authRoutes.post('/authenticate', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) throw err

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' })
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign({data: user}, config.secret, {
            expiresIn: 10080 // in seconds
          })
          res.json({ success: true, token: 'JWT ' + token })
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' })
        }
      })
    }
  })
})

module.exports = authRoutes
