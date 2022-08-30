import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import MiniCRM from '@/assets/images/minicrm-logo.png';

export default function Logo({ color = 'var(--dark)' }: { color?: string }) {
    return (
        <Box as="figure" display="flex" gap="8px" alignItems="center">
            <Image
                src={MiniCRM}
                width={23}
                height={24}
                alt="MiniCRM"
            />
            <Text as="figcaption" fontWeight={700} color={color}>Mini-CRM</Text>
        </Box>
    );
}
