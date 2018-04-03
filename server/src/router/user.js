const express = require('express')

const userRoutes = express.Router()

userRoutes.get('/profile', function (req, res) {
  const { firstName, lastName } = req.user.profile
  const { email } = req.user

  res.send({ firstName, lastName, email })
})

module.exports = userRoutes
