import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import FeedHeader from '@components/FeedHeader';

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <LazyMotion features={domAnimation}>
                <m.div
                    className="mx-auto max-w-lg"
                    key={router.route}
                    initial="from"
                    animate="to"
                    variants={{
                        from: {
                            opacity: 0,
                        },
                        to: {
                            opacity: 1,
                        }
                    }}
                >
                    <FeedHeader />
                        <main>
                            <Component {...pageProps} />
                        </main>
                </m.div>
            </LazyMotion>
        </>
    );
}

export default MyApp;
