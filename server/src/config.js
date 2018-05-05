module.exports = {
  port: envVar('PORT', 8082),
  db: {
    uri: envVar('DB_URI', 'mongodb://@ds127928.mlab.com:27928/sanmat'),
    user: envVar('DB_USER', 'smUser'),
    password: envVar('DB_PASSWORD', '$testing1')
  },
  secret: envVar('SECRET', 'vueapp-secret'),
  email: {
    user: envVar('EMAIL_USER', 'xxxxx@gmail.com'),
    password: envVar('EMAIL_PASSWORD', 'xxxxx'),
    service: envVar('EMAIL_SERVICE', 'Gmail')
  },
  website: envVar('WEBSITE', 'http://localhost:8080')
}

function envVar (key, defaultValue) {
  return process.env[key] || defaultValue
}
