const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

//store comments by post id in memory
const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  //generate a random id for the comment
  const commentId = randomBytes(4).toString('hex')

  //get the post from body
  const { content } = req.body

  const comments = commentsByPostId[req.params.id] || []

  comments.push({ id: commentId, content, status: 'pending' })

  commentsByPostId[req.params.id] = comments

  //triggering an event for event-bus
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  })

  res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  console.log('Revicieved an event', req.body.type)

  const { type, data } = req.body

  if (type === 'CommentModerated') {
    const { id, postId, status, content } = data
    const comments = commentsByPostId[postId]

    const comment = comments.find((comment) => {
      return comment.id === id
    })

    comment.status = status

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content,
      },
    })
  }

  res.send({})
})

app.listen(4001, () => {
  console.log('Listening on port 4001')
})
