import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = dynamic(() => import('./header'), { suspense: true });
const Side = dynamic(() => import('./side'), { suspense: true });

function MainLayout({ title, children }) {
    const { asPath } = useRouter();

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
                            initial={{ scale: 1, translateY: '10rem', opacity: 0 }}
                            animate={{ scale: 1, translateY: '0rem', opacity: 1 }}
                            exit={{ scale: 1, translateY: '10rem', opacity: 0 }}
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
