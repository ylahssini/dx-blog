import { ChakraProvider } from '@chakra-ui/react';
import '@/assets/styles/global.css';

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <ChakraProvider>
            {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
    );
}

export default MyApp
