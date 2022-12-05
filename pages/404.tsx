import Head from 'next/head';
import Link from 'next/link';
import { Button, Heading, Text } from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import Lottie from 'react-lottie';
import error404Lottie from '@/assets/lotties/error_404.json';
import LightLayout from '@/components/layout/light';

const cookie = new Cookies();

export default function Error404() {
    const options = {
        loop: true,
        autoplay: true,
        animationData: error404Lottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const goto = cookie.get('token') ? '/_/dashboard' : '/';

    return (
        <div>
            <Head>
                <title>Error 404 | DX-Blog</title>
            </Head>
            <Lottie options={options} height={600} width={600} />
            <Heading id="error_404" as="h1" fontWeight={200} textAlign="center">Error 404</Heading>
            <Text as="p" pb="1rem" textAlign="center">The page you are looking for cannot be found</Text>
            <Link href={goto}>
                <Button textDecoration="none" colorScheme="blue" display="block" mx="auto" title={goto}>Go to dashboard</Button>
            </Link>
        </div>
    );
}

Error404.getLayout = (page) => <LightLayout>{page}</LightLayout>;
