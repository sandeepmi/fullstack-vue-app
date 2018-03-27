module.exports = {
  port: envVar('PORT', 8082),
  db: {
    uri: envVar('DB_URI', 'mongodb://@ds127928.mlab.com:27928/sanmat'),
    user: envVar('DB_USER', 'smUser'),
    password: envVar('DB_PASS', '$testing1')
  },
  secret: envVar('SECRET', 'vueapp-secret')
}

function envVar(key, defaultValue) {
  return process.env[key] || defaultValue
}
