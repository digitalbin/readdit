import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import FeedHeader from '@components/FeedHeader';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <div className="mx-auto max-w-lg">
                <FeedHeader />
                <main>
                    <Component {...pageProps} />
                </main>
            </div>
        </>
    );
}

export default MyApp;
