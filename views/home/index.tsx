import useSWR from 'swr';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Spinner, Text } from '@chakra-ui/react';
import Login from './login';
import Instalation from './installation';
import { fetcher } from '@/utils/functions';

export default function HomeView() {
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_HOST}api/is-first-time`, fetcher);

    if (!data) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" gap="1rem" h="20rem">
                <Spinner size="md" />
                <Text as="span">Loading...</Text>
            </Box>
        )
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something goes wrong!</AlertDescription>
            </Alert>
        );
    }
    
    return !data.exist ? <Instalation /> : <Login />;
}
