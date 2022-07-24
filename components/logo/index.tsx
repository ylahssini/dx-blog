import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import MiniCRM from '@/assets/minicrm-logo.png';

export default function Logo() {
    return (
        <Box as="figure" display="flex" gap="8px" alignItems="center">
            <Image
                src={MiniCRM}
                width={23}
                height={24}
                alt="MiniCRM"
            />
            <Text as="figcaption" fontWeight={700}>Mini-CRM</Text>
        </Box>
    );
}
