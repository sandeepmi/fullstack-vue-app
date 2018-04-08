const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')

// Create auth group routes
const authRoutes = express.Router()

// Register new users
authRoutes.post('/register', function (req, res) {
  const { email, password, firstName, lastName } = req.body

  // validations
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' })
  }

  // check if email already registered
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) return res.status(500).json({})

    if (existingUser) {
      return res.send({ success: false, message: 'That email address is already registered' })
    }

    // create account
    const newUser = new User({
      email,
      password,
      profile: {
        firstName,
        lastName
      }
    })

    // save the user to database
    newUser.save(function (err) {
      if (err) return res.status(500).json({ success: false, message: 'Error occurred' })

      res.json({ success: true, message: 'Successfully created new user.' })
    })
  })
})

// Authenticate user
// return a JWT Token for future requests
authRoutes.post('/authenticate', function (req, res) {
  const { email, password } = req.body

  // validations
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please enter email and password.' })
  }

  // find user
  User.findOne({ email: email }, function (err, user) {
    if (err) return res.status(500).json({})

    if (!user) {
      return res.send({ success: false, code: 101, message: 'Authentication failed. User not found.' })
    }

    // verify password
    user.comparePassword(password, function (err, isMatch) {
      if (err || !isMatch) {
        return res.send({ success: false, code: 102, message: 'Authentication failed. Passwords did not match.' })
      }

      // update last logged in date
      user.lastLoggedInDate = new Date(Date.now()).toISOString()
      user.save(function (err) {
        if (err) return res.status(500).json({})

        // return JWT token
        const token = generateJwtToken({ userId: user._id })
        res.json({ success: true, token: 'JWT ' + token })
      })
    })
  })
})

function generateJwtToken (payload) {
  return jwt.sign(payload, config.secret, {
    expiresIn: '1d'
  })
}

module.exports = authRoutes
