import { Container, Flex, Box } from '@chakra-ui/react';
import Logo from '@/components/logo';

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
