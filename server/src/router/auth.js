const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')

// Create auth group routes
const authRoutes = express.Router()

// Register new users
authRoutes.post('/register', function (req, res) {
  const email = req.body.email
  const password = req.body.password

  // validations
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please enter email and password.' })
  }

  // check if email already registered
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) return res.status(500)

    if (existingUser) {
      return res.send({ success: false, message: 'That email address is already in use.' })
    }

    // create account
    const newUser = new User({
      email: email,
      password: password
    })

    // save the user to database
    newUser.save(function (err) {
      if (err) return res.status(500)

      res.json({ success: true, message: 'Successfully created new user.' })
    })
  })
})

// Authenticate user
// return a JWT Token for future requests
authRoutes.post('/authenticate', function (req, res) {
  const email = req.body.email
  const password = req.body.password

  // validations
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please enter email and password.' })
  }

  // find user
  User.findOne({ email: email }, function (err, user) {
    if (err) return res.status(500)

    if (!user) {
      return res.send({ success: false, code: 101, message: 'Authentication failed. User not found.' })
    }

    // verify password
    user.comparePassword(password, function (err, isMatch) {
      if (err || !isMatch) {
        return res.send({ success: false, code: 102, message: 'Authentication failed. Passwords did not match.' })
      }

      // return JWT token
      const token = generateJwtToken({ userId: user._id })

      res.json({ success: true, token: 'JWT ' + token })
    })
  })
})

function generateJwtToken (payload) {
  return jwt.sign(payload, config.secret, {
    expiresIn: '1d'
  })
}

module.exports = authRoutes
