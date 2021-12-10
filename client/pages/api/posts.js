import axios from 'axios'

const createPost = async (req, res) => {
  let title = req.title

  if (title.length > 0) {
    const response = await axios.post('http://localhost:4000/posts', {
      title,
    })
    res.send(response.status)
  } else {
    return 'title is required'
  }
}

export default createPost
