import '../styles/globals.css';
import type { AppProps } from 'next/app';
import FeedHeader from '@components/FeedHeader';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
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
