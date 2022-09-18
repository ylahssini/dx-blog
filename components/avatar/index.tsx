import { Box, Image } from '@chakra-ui/react';

export default function Avatar({ text = '', url, boxSize, isCircle = false }) {
    if (url) {
        return (
            <Image
                src={url}
                boxSize={boxSize}
                objectFit="cover"
                borderRadius={isCircle ? '999em' : 0}
            />
        );
    }
    
    return (
        <Box
            bgColor="#e0e0e0"
            borderRadius={isCircle ? '999em' : 0}
            w={boxSize}
            h={boxSize}
            fontWeight={400}
            fontSize="1.5rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {text || '\'~\''}
        </Box>
    );
}
