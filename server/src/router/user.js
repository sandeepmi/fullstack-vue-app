const express = require('express')
const User = require('../models/User')

const userRoutes = express.Router()

userRoutes.get('/profile', function (req, res) {
  User.findById(req.user.id, function (err, user) {
    if (err) return res.status(500)

    const { firstName, lastName } = user.profile
    const { email } = user

    res.send({ firstName, lastName, email })
  })
})

module.exports = userRoutes
