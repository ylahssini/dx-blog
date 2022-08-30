import Link from 'next/link';
import Router from 'next/router';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Logo from '@/components/logo';
import { logout } from '@/apis/auth';
import styles from './styles.module.css';
import { useIsConnected } from '@/utils/hooks';

const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const variants = {
    exit: { x: 100, opacity: 0, transition },
    enter: { x: 0, opacity: 1, transition: { delay: 1, ...transition } },
};

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
        <motion.div variants={variants} initial="exit" animate="enter" exit="exit">
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
                    <li className={styles.menu_item}><button onClick={handleClick}>Log out</button></li>
                </ul>
            </Box>
        </motion.div>
    );
}
