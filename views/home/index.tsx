import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Spinner, Text } from '@chakra-ui/react';
import Login from './login';
import Instalation from './installation';
import { useFirstInstallTime } from '@/apis/auth';

export default function HomeView() {
    const { data, error } = useFirstInstallTime();

    if (error) {
        return (
            <Alert id="error" status="error">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something goes wrong!</AlertDescription>
            </Alert>
        );
    }

    if (!data) {
        return (
            <Box id="loading" display="flex" alignItems="center" justifyContent="center" gap="1rem" h="20rem">
                <Spinner size="md" />
                <Text as="span">Loading...</Text>
            </Box>
        );
    }

    return !data.exist ? <Instalation /> : <Login />;
}
