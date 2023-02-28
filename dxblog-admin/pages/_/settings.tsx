import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import MainLayout from '@/components/layout/main';
import SettingsView from '@/views/settings';

export default function Welcome() {
    return (
        <Box as="section" pt="2rem">
            <Head>
                <title>DX-Blog - Settings</title>
            </Head>

            <SettingsView />
        </Box>
    );
}

Welcome.getLayout = (page) => <MainLayout title="Settings">{page}</MainLayout>;
