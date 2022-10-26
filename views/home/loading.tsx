import { Box, Text, Spinner } from '@chakra-ui/react';

export default function Loading({ text = 'Loading...' }) {
    return (
        <Box id="loading" display="flex" alignItems="center" justifyContent="center" gap="1rem" h="25rem">
            <Spinner size="md" />
            <Text as="span">{text}</Text>
        </Box>
    );
}
