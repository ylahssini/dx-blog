import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Layout from '@/components/layout/auth';
import HomeView from '@/views/home';

const Home = () => {
    return (
        <Box as="section" pt="2rem">
            <Head>
                <title>Welcome to Mini-CRM</title>
            </Head>

            <HomeView />
        </Box>
    );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
