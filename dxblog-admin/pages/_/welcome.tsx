import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import MainLayout from '@/components/layout/main';

export default function Welcome() {
    return (
        <Box as="section" pt="2rem">
            <Head>
                <title>DX-Blog - Home</title>
            </Head>

            <Box p="2rem">
                Welcome content
            </Box>
        </Box>
    );
}

Welcome.getLayout = (page) => <MainLayout title="Welcome">{page}</MainLayout>;
