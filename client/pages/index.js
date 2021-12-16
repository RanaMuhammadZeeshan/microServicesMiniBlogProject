import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import App from '../components/appComponent/app'

export default function Home({ posts }) {
  const [postsList, setPostsList] = useState(posts)

  const getPosts = async () => {
    try {
      const posts = await axios.get('http://localhost:4002/posts')

      setPostsList(posts.data)
    } catch (error) {
      console.log('hereeror')
      setPostsList([])
    }
  }

  return (
    <div>
      <Head>
        <title>Microservices mini blog</title>
        <meta
          name='Microservices mini blog'
          content='Microservices mini blog'
        />
      </Head>

      <main>
        <App posts={postsList} getPosts={getPosts} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:4002/posts')
    const posts = response.data || {}

    return {
      props: {
        posts,
      },
    }
  } catch (error) {
    if (error) {
      return {
        props: {
          posts: {},
        },
      }
    }
  }
}
