import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import { fetcher } from '@/lib/client';
import '@/assets/styles/global.css';
import '@/assets/styles/animations.css';
import '@/assets/styles/paginate.css';

function MiniCRMApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="theme-color" content="#000" />
                <meta key="robots" name="robots" content="noindex,nofollow" />
                <meta key="googlebot" name="googlebot" content="noindex,nofollow" />
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
            </Head>

            <SWRConfig value={{ fetcher }}>
                <ChakraProvider>
                    {getLayout(<Component {...pageProps} />)}
                </ChakraProvider>
            </SWRConfig>
        </>
    );
}

export default MiniCRMApp;
