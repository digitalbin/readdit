import '../styles/globals.css'
import Head from 'next/head';
import type { AppProps } from 'next/app'
import FeedHeader from '@components/FeedHeader'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="mx-auto max-w-lg">
          <FeedHeader />
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </>
  )
}

export default MyApp
