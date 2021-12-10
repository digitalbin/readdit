import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/meta/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/meta/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/meta/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/meta/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/meta/safari-pinned-tab.svg"
                        color="#ffffff"
                    />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
