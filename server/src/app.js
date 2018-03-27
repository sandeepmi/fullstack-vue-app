const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')

const config = require('./config')
const router = require('./router')
const dbConnection = require('./db-connection.js')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))

// passport setup
require('./passport.js')(passport)
app.use(passport.initialize())

// router setup
router(app, passport)

dbConnection(connection => {
  app.listen(config.port, () => {
    console.log('server app running...')
  })
})
