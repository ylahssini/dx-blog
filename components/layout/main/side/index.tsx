import Link from 'next/link';
import Router from 'next/router';
import { Box, Button, Text } from '@chakra-ui/react';
import Logo from '@/components/logo';
import { logout } from '@/apis/auth';
import styles from './styles.module.css';
import { useIsConnected } from '@/utils/hooks';

export default function Side() {
    const { mutate } = useIsConnected({});

    async function handleClick() {
        try {
            await logout();
            mutate();
            Router.push('/');
        } catch (error) {
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
                        <Button textDecoration="none" onClick={handleClick} colorScheme="white" variant="link">
                            Log out
                        </Button>
                    </li>
                </ul>
            </Box>
        </>
    );
}
