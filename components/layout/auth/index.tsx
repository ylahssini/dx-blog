import { Container, Flex, Box } from '@chakra-ui/react';
import Logo from '@/components/logo';
import Abstract from './abstract';

export default function Layout({ children }) {
    return (
        <Container w="100%" maxW="100%" h="100vh" p={0}>
            <Flex justifyContent="center" h="100%">
                <Box w="50%" h="100%">
                    <Logo />
                    {children}
                </Box>
                <Abstract />
            </Flex>
        </Container>
    )
}
