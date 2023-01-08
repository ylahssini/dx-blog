import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Container, Flex, Box } from '@chakra-ui/react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

const Logo = dynamic(() => import('@/components/logo'), { ssr: true });

export default function AuthLayout({ children }) {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    return (
        <>
            <Container w="100%" maxW="100%" h="100vh" p={0} position="relative" zIndex={10}>
                <Flex justifyContent="center" h="100%">
                    <Box w="50%" h="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Box as="main" w="100%" maxW="400px">
                            <Logo />
                            {children}
                        </Box>
                    </Box>
                </Flex>
            </Container>

            <Particles
                id="particles"
                init={particlesInit}
                options={{
                    background: {
                        color: {
                            value: '#f4f7fb',
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        modes: {
                            push: {
                                quantity: 9,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: '#146fee',
                        },
                        links: {
                            color: '#4990f3',
                            distance: 200,
                            enable: true,
                            opacity: 0.3,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: {
                                default: 'bounce',
                            },
                            random: false,
                            speed: 0.5,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1200,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: 'circle',
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </>
    );
}
