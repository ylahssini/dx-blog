import { Box, Heading, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Form = dynamic(() => import('./form'), { ssr: true });

export default function Installation() {
    return (
        <>
            <Box as="header" pb="2rem">
                <Heading as="h1" fontWeight={200}>Welcome</Heading>
                <Text as="p">Please provide all needed information for installation</Text>
            </Box>

            <Form />
        </>
    );
}
