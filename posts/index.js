const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

//store posts in memory
const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', (req, res) => {
  //generating random id using randomBytes
  const id = randomBytes(4).toString('hex')

  const { title } = req.body

  //adding key (id) and value (title) to posts object
  posts[id] = {
    id,
    title,
  }

  res.status(201).send(posts[id])
})

app.listen(4000, () => {
  console.log('listening on 4000')
})
