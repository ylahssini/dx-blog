import { Box, Heading, Text } from '@chakra-ui/react'
import Form from './form';

export default function Instalation() {
    return (
        <>
            <Box as="header" pb="2rem">
                <Heading as="h1" fontWeight={200}>Welcome</Heading>
                <Text as="p">Please provide all needed information for instalation</Text>
            </Box>

            <Form />
        </>
    );
}
