const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const config = require('../config/config.js')
const router = require('./router.js')
const dbConnection = require('./db-connection.js')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))

router(app)

dbConnection(() => {
  app.listen(config.port, () => {
    console.log('server app running...')
  })
})