import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import MainLayout from '@/components/layout/main';
import UsersView from '@/views/users';

export default function Users() {
    return (
        <Box as="section" pt="2rem">
            <Head>
                <title>DX-Blog - Users</title>
            </Head>

            <UsersView />
        </Box>
    );
}

Users.getLayout = (page) => <MainLayout title="Users">{page}</MainLayout>;
