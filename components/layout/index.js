import { Container, Grid, GridItem, Center, Circle } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons'

export default function Layout({ children }) {
    return (
        <Container maxW='1024'>
            <Grid
                templateAreas={`
                    "header"
                    "main"
                    "footer"
                `}
                gridTemplateRows="0.3fr 2.5fr 0.2fr"
                gridTemplateColumns="1fr"
            >
                <GridItem area={'header'}>
                    <Center p={5}>
                        <Circle size='40px' bg='tomato' color='white'>
                            <PhoneIcon />
                        </Circle>
                    </Center>
                </GridItem>
                {children}
            </Grid>
        </Container>
    )
}
