import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CommentList({ postId }) {
  const [comments, setComments] = useState([])

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    )

    setComments(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>
  })

  return <ul>{renderedComments}</ul>
}

export default CommentList
