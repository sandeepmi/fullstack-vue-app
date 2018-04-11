const express = require('express')
const User = require('../models/User')
const { dateNow } = require('../helpers/utils')

// Create auth group routes
const authRoutes = express.Router()

// Change password
authRoutes.post('/changePassword', function (req, res) {
  const { password, newPassword } = req.body

  // validations
  if (!password || !newPassword) {
    return res.status(400).json({ success: false, message: 'Please provide all required data' })
  }

  // find user
  User.findById(req.user._id, function (err, user) {
    if (err) return res.status(500).json({})

    // verify password
    user.comparePassword(password, function (err, isMatch) {
      if (err || !isMatch) {
        return res.send({ success: false, code: 101, message: 'Incorrect Password' })
      }

      // change password and save to database
      user.password = newPassword
      user.lastPasswordChangeDate = dateNow()
      user.save(function (err) {
        if (err) return res.status(500).json({})

        res.json({ success: true, message: 'Successfully changed password.' })
      })
    })
  })
})

module.exports = authRoutes
