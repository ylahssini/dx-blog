import { Box } from '@chakra-ui/react';

export default function Header({ title }) {
    return (
        <Box as="header" p="2rem" color="var(--primary)" fontSize="2rem" fontWeight={700}>
            <h1>{title}</h1>
        </Box>
    );
}