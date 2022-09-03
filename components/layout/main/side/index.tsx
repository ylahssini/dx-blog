import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import Logo from '@/components/logo';
import { logout } from '@/apis/auth';
import styles from './styles.module.css';
import { useIsConnected } from '@/utils/hooks';

export default function Side() {
    const [logginOut, setLoggingOut] = useState(false);
    const { mutate } = useIsConnected({});
    const toast = useToast();

    async function handleClick() {
        try {
            setLoggingOut(true);
            await logout();
            mutate();
            Router.push('/');
        } catch (error) {
            setLoggingOut(false);
            toast({
                title: 'Error',
                description: error.response.data.message,
                duration: 5000,
                status: 'error',
                isClosable: true,
            });
            console.log(error);
        }
    }

    const menu = [
        { href: '/dashboard', text: 'Dashboard', icon: 'dashboard' },
        { href: '/orders', text: 'Orders', icon: '' },
        { href: '/customers', text: 'Customers', icon: '' },
        { href: '/products', text: 'Products', icon: '' },
    ];

    return (
        <>
            <Box as="header" mb="1.5rem"><Logo color="#fff" /></Box>

            <Box p="2rem 0 0">
                <Text as="h4" casing="uppercase" color="white" fontSize="0.8rem" pb="1rem">Menu</Text>
                <ul>
                    {menu.map((item) => (
                        <Box key={item.href} as="li" className={styles.menu_item}>
                            <Link href={item.href}>{item.text}</Link>
                        </Box>
                    ))}
                </ul>
            </Box>

            <Box p="2rem 0 0">
                <Text as="h4" casing="uppercase" color="white" fontSize="0.8rem" pb="1rem">Hello, Se</Text>
                <ul>
                    <li className={styles.menu_item}><Link href="/settings">Settings</Link></li>
                    <li className={styles.menu_item}>
                        <Button
                            onClick={handleClick}
                            colorScheme="white"
                            variant="link"
                            fontWeight={400}
                            disabled={logginOut}
                            isLoading={logginOut}
                            _hover={{ textDecoration: 'none' }}
                        >
                            Log out
                        </Button>
                    </li>
                </ul>
            </Box>
        </>
    );
}
