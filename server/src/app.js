const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = process.env.port || 8082
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.get('/api/getItems', (req, res) => {
  res.send([
    {
      id: 1,
      title: 'test 1',
      type: 'type 1'
    },
    {
      id: 2,
      title: 'test 2',
      type: 'type 2'
    }
  ])
})

app.listen(port, () => {
  console.log('server app running...')
})
