import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import DXBlog from '@/assets/images/dxblog-logo.png';

export default function Logo({ color = 'var(--dark)' }: { color?: string }) {
    return (
        <Box as="figure" display="flex" gap="8px" alignItems="center">
            <Image
                src={DXBlog}
                width={23}
                height={24}
                alt="DX-Blog"
            />
            <Text as="figcaption" fontWeight={700} color={color}>DX-Blog</Text>
        </Box>
    );
}
