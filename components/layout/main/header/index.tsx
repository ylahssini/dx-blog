import { Box, Flex, Input, Text } from '@chakra-ui/react';
import Avatar from '@/components/avatar';
import { useIsConnected } from '@/utils/hooks';

export default function Header({ title }) {
    const { user } = useIsConnected();

    return (
        <Flex as="header" p="2rem" color="var(--primary)" fontSize="2rem" fontWeight={700} alignItems="center" justifyContent="space-between">
            <h1>{title}</h1>
            <Input
                color="var(--primary)"
                maxW={300}
                placeholder="Search"
                _placeholder={{ color: 'inherit', fontWeight: 400 }}
            />
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
