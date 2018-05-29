const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../models/User')
const config = require('../config')
const mailer = require('../mailer')
const { dateNow, isEmail } = require('../helpers/utils')

// Create auth group routes
const authRoutes = express.Router()

// Register new users
authRoutes.post('/register', function (req, res) {
  const { email, password, firstName, lastName } = req.body

  // validations
  // required fields
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' })
  }

  // email validation
  if (!isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email' })
  }

  // check if email already registered
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) return res.status(500).json({})

    if (existingUser) {
      return res.send({ success: false, code: 101, message: 'That email address is already registered' })
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
      user.lastLoggedInDate = dateNow()
      user.save(function (err) {
        if (err) return res.status(500).json({})

        // return JWT token
        const token = generateJwtToken(req, user)
        res.json({ success: true, token: 'JWT ' + token })
      })
    })
  })
})

// Forgot password
authRoutes.post('/forgotPassword', function (req, res) {
  const { email } = req.body

  // validations
  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide an email' })
  }

  // find user
  User.findOne({ email: email }, function (err, user) {
    if (err) return res.status(500).json({})

    const successMsg = 'User will recieve an email if the provided email was registered'
    if (user) {
      // generate token
      crypto.randomBytes(20, function (err, buffer) {
        if (err) return res.status(500).json({})

        var token = buffer.toString('hex')

        // save reset password info
        user.resetPasswordToken = token
        user.resetPasswordDate = dateNow()
        user.save(function (err) {
          if (err) return res.status(500).json({})

          // send forgot password email
          var emailOptions = {
            to: user.email,
            from: `Node App <site@nodeapp.com>`,
            template: 'forgot-password',
            subject: 'Forgot Password Help',
            context: {
              url: `${config.website}/account/reset-password?token=${token}`,
              name: user.profile.firstName
            }
          }

          mailer.sendMail(emailOptions, function (err) {
            if (err) return res.status(500).json({})

            return res.json({ success: true, message: successMsg })
          })
        })
      })
    } else {
      return res.json({ success: true, message: successMsg })
    }
  })
})

// Reset password
authRoutes.post('/resetPassword', function (req, res) {
  const { token, password } = req.body

  // validations
  if (!token || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all required data' })
  }

  // find user
  User.findOne({
    resetPasswordToken: req.body.token,
    resetPasswordDate: {
      $gt: new Date(Date.now() - 86400000).toISOString()
    }
  }, function (err, user) {
    if (err) return res.status(500).json({})

    if (user) {
      // update password, reset reset password info
      user.password = password
      user.resetPasswordToken = null
      user.save(function (err) {
        if (err) return res.status(500).json({})

        // send reset password email
        var emailOptions = {
          to: user.email,
          from: `Node App <site@nodeapp.com>`,
          template: 'reset-password',
          subject: 'Reset Password',
          context: {
            name: user.profile.firstName
          }
        }

        mailer.sendMail(emailOptions, function (err) {
          if (err) {
            console.log('Failed to send reset password error', err)
          }
        })

        return res.json({ success: true, message: 'Successfully reset password' })
      })
    } else {
      return res.json({ success: false, code: 101, message: 'Password reset token is invalid or has expired.' })
    }
  })
})

// Check reset password token validity
authRoutes.post('/resetPassword/valid', function (req, res) {
  const { token } = req.body

  // validations
  if (!token) {
    return res.status(400).json({ success: false, message: 'Token missing' })
  }

  // find user
  User.findOne({
    resetPasswordToken: req.body.token,
    resetPasswordDate: {
      $gt: new Date(Date.now() - 86400000).toISOString()
    }
  }, function (err, user) {
    if (err) return res.status(500).json({})

    if (user) {
      return res.json({ success: true, message: 'Valid token' })
    } else {
      return res.json({ success: false, code: 101, message: 'Invalid token' })
    }
  })
})

function generateJwtToken (req, user) {
  const payload = {
    userId: user._id,
    // ip: req.ip,
    agent: req.headers['user-agent']
  }

  return jwt.sign(payload, config.secret, {
    expiresIn: '1d'
  })
}

module.exports = authRoutes
