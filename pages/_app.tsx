import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
// import { LazyMotion, domAnimation, m } from 'framer-motion';
import FeedHeader from '@components/FeedHeader';

function MyApp({ Component, pageProps, /* router */ }: AppProps) {
    const postTitle = pageProps?.posts?.data?.children?.[0]?.data?.title;
    const title = `Vollie - ${postTitle || 'User ixperians'}`;
    
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <title>{title}</title>
                <meta name="description" content="Vollie is a scumbag type of site that steals content from the generous open reddit json api, made purely to flex on potential employers with its sick user ixperians" />
            </Head>
            {/* <LazyMotion features={domAnimation}> */}
                <div
                    className="mx-auto max-w-lg"
                    // key={router.route}
                    // initial="from"
                    // animate="to"
                    // variants={{
                    //     from: {
                    //         opacity: 0,
                    //     },
                    //     to: {
                    //         opacity: 1,
                    //     }
                    // }}
                >
                    <FeedHeader />
                        <main>
                            <Component {...pageProps} />
                        </main>
                </div>
            {/* </LazyMotion> */}
        </>
    );
}

export default MyApp;
