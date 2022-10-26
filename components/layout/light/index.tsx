import dynamic from 'next/dynamic';
import { Container, Flex, Box } from '@chakra-ui/react';

const Logo = dynamic(() => import('@/components/logo'), { suspense: true });

export default function LightLayout({ children }) {
    return (
        <Container w="100%" maxW="100%" h="100vh" p={0}>
            <Flex justifyContent="center" h="100%">
                <Box w="50%" h="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box as="main" w="100%" maxW="400px">
                        <Box as="header" display="flex" justifyContent="center"><Logo /></Box>

                        <Box as="section" display="flex" justifyContent="center" alignItems="center" h="100%">
                            {children}
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}
