const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = process.env.port || 8082
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.get('/api/getTodos', (req, res) => {
  res.send([
    {
      title: 'test 1',
      isDone: false
    },
    {
      title: 'test 2',
      isDone: true
    }
  ])
})

app.listen(port, () => {
  console.log('server app running...')
})
