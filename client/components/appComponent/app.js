import PostCreate from './postCreate'
import PostList from './postList'

export default function App({ posts }) {
  return (
    <div className='container'>
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList posts={posts} />
    </div>
  )
}
