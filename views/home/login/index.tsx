import { Box, Heading, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Form = dynamic(() => import('./form'), { ssr: false });

export default function Login() {
    return (
        <>
            <Box as="header" pb="4rem">
                <Heading as="h1" fontWeight={200}>Login</Heading>
                <Text as="p">Welcome! please enter your details</Text>
            </Box>

            <Form />
        </>
    );
}
