import dynamic from 'next/dynamic';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useIsConnected } from '@/utils/hooks';

const Avatar = dynamic(() => import('@/components/avatar'), { ssr: true });

export default function Header({ title }) {
    const { user } = useIsConnected();

    return (
        <Flex as="header" p="2rem" color="var(--primary)" fontSize="2rem" fontWeight={700} alignItems="center" justifyContent="space-between">
            <h1>{title}</h1>
            <Box display="flex" alignItems="center" justifyContent="flex-end" gap="1rem" color="black">
                <Box as="header" textAlign="right" fontSize="sm" lineHeight={1}>
                    <Text as="small" fontWeight={300}>Hello</Text><br />
                    <Text as="strong">{user?.data?.first_name} {user?.data?.last_name}</Text>
                </Box>
                <Avatar url={user?.data?.picture} boxSize="45px" text={user?.data?.first_name.charAt(0)} isCircle />
            </Box>
        </Flex>
    );
}
