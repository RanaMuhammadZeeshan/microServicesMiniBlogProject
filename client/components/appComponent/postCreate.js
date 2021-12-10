import { useState } from 'react'
import createPost from '../../pages/api/posts'

export default function PostCreate() {
  const [title, setTitle] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const result = await createPost({ title })
    console.log(result)

    setTitle('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control'
          />
        </div>

        <button className='btn btn-primary '>Submit</button>
      </form>
    </div>
  )
}
