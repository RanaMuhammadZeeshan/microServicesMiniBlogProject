import { useState, useEffect } from 'react'

const PostList = ({ posts }) => {
  const [postsList, setPostsList] = useState({})

  useEffect(() => {
    setPostsList(posts)
  }, [posts])

  const renderedPosts = Object.values(postsList).map((post) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
        </div>
      </div>
    )
  })

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  )
}

export default PostList
