import dynamic from 'next/dynamic';
import { Container, Flex, Box } from '@chakra-ui/react';
import { useIsConnected } from '@/utils/hooks';

const Logo = dynamic(() => import('@/components/logo'), { suspense: true });
const Abstract = dynamic(() => import('./abstract'), { suspense: true });

export default function AuthLayout({ children }) {
    useIsConnected({ to: '/_/dashboard', redirectIfFound: true });

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
