module.exports = {
  port: process.env.PORT || 8082,
  db: {
    uri: 'mongodb://@ds127928.mlab.com:27928/sanmat',
    user: process.env.DB_USER || 'smUser',
    password: process.env.DB_PASS || '$testing1'
  }
}
