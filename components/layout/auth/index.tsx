import { Container, Flex, Box } from '@chakra-ui/react';
import Logo from '@/components/logo';
import Abstract from './abstract';
import { useIsConnected } from '@/utils/hooks';

export default function AuthLayout({ children }) {
    useIsConnected({ to: '/dashboard', redirectIfFound: true });

    return (
        <Container w="100%" maxW="100%" h="100vh" p={0}>
            <Flex justifyContent="center" h="100%">
                <Box w="50%" h="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box as="main" w="100%" maxW="400px">
                        <Logo />
                        {children}
                    </Box>
                </Box>
                <Abstract />
            </Flex>
        </Container>
    );
}
