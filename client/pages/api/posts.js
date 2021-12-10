import axios from 'axios'

export const createPost = async (req, res) => {
  let title = req.title

  if (title.length > 0) {
    const response = await axios.post('http://localhost:4000/posts', {
      title,
    })
    return response
  } else {
    return 'title is required'
  }
}

export const fetchPosts = async (req, res) => {
  const response = await axios.get('http://localhost:4000/posts')

  return response.data
}
