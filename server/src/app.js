const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

const config = require('../config/config.js')
const router = require('./router.js')
const dbConnection = require('./db-connection.js')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))

require('./passport.js')(passport)

// passport setup
app.use(session({ secret: 'vueapp-secret' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

router(app, passport)

dbConnection(() => {
  app.listen(config.port, () => {
    console.log('server app running...')
  })
})
