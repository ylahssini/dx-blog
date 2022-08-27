import { Container } from '@chakra-ui/react';
import { useIsConnected } from '@/utils/hooks';

function MainLayout({ children }) {
    useIsConnected({ to: '/' });

    return (
        <Container width="100%">
            header
            {children}
            fotoer
        </Container>
    );
}

export default MainLayout;
