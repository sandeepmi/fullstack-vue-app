module.exports = (onSuccess) => {
  const config = require('./config')
  const restful = require('node-restful')
  const mongoose = restful.mongoose

  mongoose.connect(config.db.uri, {
    auth: {
      user: config.db.user,
      password: config.db.password
    }
  })
    .then(() => onSuccess(mongoose.connection))
    .catch(err => console.error('db connection error: ' + err))
}
