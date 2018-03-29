const express = require('express')
const userRoutes = express.Router()

userRoutes.get('/profile', function (req, res) {
  res.send({ id: req.user._id, email: req.user.email })
})

module.exports = userRoutes
