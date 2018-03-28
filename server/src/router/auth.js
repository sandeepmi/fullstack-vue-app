const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')

// Create auth group routes
const authRoutes = express.Router()

// Register new users
authRoutes.post('/register', function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' })
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    })

    // Attempt to save the user
    newUser.save(function (err) {
      if (err) {
        if (err.code === 11000) {
          res.json({ success: false, message: 'That email address already exists.', code: 101 })
        } else {
          res.status(500).send('Unexpected error')
        }
      }
      res.json({ success: true, message: 'Successfully created new user.' })
    })
  }
})

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
authRoutes.post('/authenticate', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(500).send('Unexpected error')
    }

    if (!user) {
      res.send({
        success: false,
        message: 'Authentication failed. User not found.',
        code: 101
      })
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          const payload = { userId: user._id }
          const token = jwt.sign(payload, config.secret, {
            expiresIn: '1d'
          })
          res.json({
            success: true,
            token: 'JWT ' + token
          })
        } else {
          res.send({
            success: false,
            message: 'Authentication failed. Passwords did not match.',
            code: 102
          })
        }
      })
    }
  })
})

module.exports = authRoutes
