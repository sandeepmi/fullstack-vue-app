module.exports = (onSuccess) => {
  const mongoose = require('mongoose')
  const config = require('../config/config.js')

  mongoose.connect(config.db.uri, {
    auth: {
      user: config.db.user,
      password: config.db.password
    }
  })
    .then(onSuccess)
    .catch(err => console.error('db connection error: ' + err))
}
