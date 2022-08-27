import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import AuthLayout from '@/components/layout/auth';
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

Home.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Home;
