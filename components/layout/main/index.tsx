import { Container, Grid, GridItem } from '@chakra-ui/react';
import { useIsConnected } from '@/utils/hooks';
import Side from './side';
import Header from './header';

function MainLayout({ title, children }) {
    useIsConnected({});

    return (
        <Container w="100%" h="100vh" maxW="100%" p="0">
            <Grid templateColumns="1fr 4fr" templateRows="1fr" gridTemplateAreas={'"side content"'}>
                <GridItem area="side" bgColor="var(--primary)" p="3rem 2rem" h="100vh">
                    <Side />
                </GridItem>
                <GridItem area="content" h="100%">
                    <Header title={title} />
                    {children}
                </GridItem>
            </Grid>
        </Container>
    );
}

export default MainLayout;
