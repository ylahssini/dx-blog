import { Container, Grid, GridItem, Center, Circle } from '@chakra-ui/react';
import { BiUserCircle } from "react-icons/bi";

export default function Layout({ children }) {
    return (
        <Container maxW='1280'>
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
                    <Center p={5} gap="2">
                        <Circle size='40px' bg='tomato' color='white'>
                            <BiUserCircle size={30} />
                        </Circle>

                        Mini-CRM
                    </Center>
                </GridItem>
                {children}
            </Grid>
        </Container>
    )
}
