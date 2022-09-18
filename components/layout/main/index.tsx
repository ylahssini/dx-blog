import { useRouter } from 'next/router';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsConnected } from '@/utils/hooks';
import Side from './side';
import Header from './header';

function MainLayout({ title, children }) {
    const { asPath } = useRouter();
    useIsConnected();

    return (
        <Container w="100%" h="100vh" maxW="100%" p="0">
            <Grid templateColumns="1fr 4fr" templateRows="1fr" gridTemplateAreas={'"side content"'}>
                <GridItem area="side" bgColor="var(--primary)" p="3rem 2rem" h="100vh">
                    <Side />
                </GridItem>
                <GridItem area="content" h="100%">
                    <AnimatePresence mode="wait">
                        <motion.div
                            className="item"
                            initial={{ scale: 1, translateX: '100rem', opacity: 0 }}
                            animate={{ scale: 1, translateX: '0rem', opacity: 1 }}
                            exit={{ scale: 1, translateX: '100rem', opacity: 0 }}
                            transition={{ type: 'spring' }}
                            key={asPath}
                        >
                            <Header title={title} />
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </GridItem>
            </Grid>
        </Container>
    );
}

export default MainLayout;
