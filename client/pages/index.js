import Head from 'next/head'
import App from '../components/appComponent/app'

export default function Home() {
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
        <App />
      </main>
    </div>
  )
}
