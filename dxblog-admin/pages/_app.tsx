import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import { fetcher } from '@/lib/client';
import '@/assets/styles/global.css';
import '@/assets/styles/animations.css';
import '@/assets/styles/paginate.css';
import store, { globalState, ServerContext } from '@/store';

function DXBlogApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);
    store.serverInitialize(globalState);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="theme-color" content="#000" />
                <meta key="robots" name="robots" content="noindex,nofollow" />
                <meta key="googlebot" name="googlebot" content="noindex,nofollow" />
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <link rel="preload" href="/api/category/list" crossOrigin="anonymous"></link>
            </Head>

            <SWRConfig value={{ fetcher }}>
                <ServerContext.Provider value={globalState}>
                    <ChakraProvider>
                        {getLayout(<Component {...pageProps} />)}
                    </ChakraProvider>
                </ServerContext.Provider>
            </SWRConfig>
        </>
    );
}

export default DXBlogApp;
