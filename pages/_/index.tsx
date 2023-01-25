import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import AuthLayout from '@/components/layout/auth';
import HomeView from '@/views/home';

export default function Home() {
    return (
        <Box as="section" pt="2rem">
            <Head>
                <title>Welcome to DX-Blog</title>
            </Head>
            <HomeView />
        </Box>
    );
}

Home.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
