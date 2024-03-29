import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Spinner, Text, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Cookies from 'universal-cookie';
import { MdOutlineFrontHand, MdOutlineArticle, MdOutlineSettings, MdLogout, MdOutlineCategory, MdOutlineSupervisedUserCircle } from 'react-icons/md';
import { logout } from '@/apis/auth';
import { useIsConnected } from '@/utils/hooks';
import { COOKIE_OPTIONS } from '@/utils/constants';
import styles from './styles.module.css';

const Logo = dynamic(() => import('@/components/logo'), { ssr: true });

const menu = [
    { href: '/_/welcome', text: 'Welcome', icon: <MdOutlineFrontHand /> },
    { href: '/_/categories', text: 'Categories', icon: <MdOutlineCategory /> },
    { href: '/_/posts', text: 'Posts', icon: <MdOutlineArticle /> },
    { href: '/_/users', text: 'Users', icon: <MdOutlineSupervisedUserCircle /> }
];

const framerUl = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { delayChildren: 0.8, staggerDirection: -1 } },
};

const framerLi = { hidden: { opacity: 0 }, show: { opacity: 1 } };

export default function Side() {
    const [logginOut, setLoggingOut] = useState(false);
    const { user, mutate } = useIsConnected();
    const toast = useToast();
    const { push, pathname } = useRouter();

    async function handleClick() {
        try {
            const cookie = new Cookies();
            cookie.remove('token', COOKIE_OPTIONS);

            setLoggingOut(true);
            await logout();

            mutate();
            push('/_');
        } catch (error) {
            setLoggingOut(false);
            toast({ title: 'Error', description: error.response.data.message, duration: 5000, status: 'error', isClosable: true });
            console.log(error);
        }
    }

    return (
        <>
            <Box as="header" mb="1.5rem"><Logo color="#fff" /></Box>

            <Box p="2rem 0 0">
                <Text as="h4" casing="uppercase" color="white" fontSize="0.75rem" pb="1rem">Menu</Text>
                <motion.ul initial={framerUl.hidden} animate={framerUl.show}>
                    {menu.map((item) => (
                        <motion.li key={item.href} className={`${styles.menu_item} ${pathname.includes(item.href) ? styles.__active : ''}`} initial={framerLi.hidden} animate={framerLi.show}>
                            <Link href={item.href}><a>{item.icon} {item.text}</a></Link>
                        </motion.li>
                    ))}
                </motion.ul>
            </Box>

            <Box p="2rem 0 0">
                <Text as="h4" casing="uppercase" color="white" fontSize="0.8rem" pb="1rem">Hello, {user?.data?.first_name || <Spinner color="white" size='xs' />}</Text>
                <motion.ul initial={framerUl.hidden} animate={framerUl.show}>
                    <motion.li className={`${styles.menu_item} ${pathname.includes('settings') ? styles.__active : ''}`} initial={framerLi.hidden} animate={framerLi.show}><Link href="/_/settings"><a><MdOutlineSettings /> Settings</a></Link></motion.li>
                    <motion.li className={styles.menu_item} initial={framerLi.hidden} animate={framerLi.show}>
                        <Button
                            onClick={handleClick}
                            colorScheme="white"
                            variant="link"
                            fontWeight={400}
                            disabled={logginOut}
                            isLoading={logginOut}
                            loadingText="Logging out..."
                            _hover={{ textDecoration: 'none' }}
                        >
                            <MdLogout /> Log out
                        </Button>
                    </motion.li>
                </motion.ul>
            </Box>
        </>
    );
}
