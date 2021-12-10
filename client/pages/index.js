import Head from 'next/head'
import App from '../components/appComponent/app'
import { fetchPosts } from './api/posts'

export default function Home({ posts }) {
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
        <App posts={posts} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetchPosts()

  const posts = response
  return {
    props: {
      posts,
    },
  }
}
