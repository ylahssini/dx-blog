import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import '@/assets/styles/global.css';
import '@/assets/styles/animations.css';

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;400;700&display=swap" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="theme-color" content="#000" />
                <meta key="robots" name="robots" content="noindex,nofollow" />
                <meta key="googlebot" name="googlebot" content="noindex,nofollow" />
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
            </Head>

            <ChakraProvider>
                {getLayout(<Component {...pageProps} />)}
            </ChakraProvider>
        </>
    );
}

export default MyApp
