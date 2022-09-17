import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import HomeView from '@/views/home';

function Home() {
    return (
        <Box as="section" pt="2rem">
            <Head>
                <title>Welcome to Mini-CRM</title>
            </Head>

            <HomeView />
        </Box>
    );
}

export default Home;
