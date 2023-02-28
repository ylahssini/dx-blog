import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { useFirstInstallTime } from '@/apis/auth';
import Loading from '@/components/loading';

const Login = dynamic(() => import('./login'), { ssr: true });
const Installation = dynamic(() => import('./installation'), { ssr: true });

export default function HomeView() {
    const { data, error } = useFirstInstallTime();

    if (error) {
        return (
            <Alert id="error" status="error">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something goes wrong!</AlertDescription>
            </Alert>
        );
    }

    if (!data) {
        return <Loading />;
    }

    return (
        <Suspense fallback={<Loading text="Loading component..." />}>
            {!data.exist ? <Installation /> : <Login />}
        </Suspense>
    );
}
