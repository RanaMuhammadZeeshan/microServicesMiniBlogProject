const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

//store posts in memory
const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  //generating random id using randomBytes
  const id = randomBytes(4).toString('hex')

  const { title } = req.body

  //adding key (id) and value (title) to posts object
  posts[id] = {
    id,
    title,
  }

  //triggering an event for event-bus
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  })

  res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  res.send({})
})

app.listen(4000, () => {
  console.log('listening on 4000')
})
