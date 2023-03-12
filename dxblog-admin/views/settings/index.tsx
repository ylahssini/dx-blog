import dynamic from 'next/dynamic';
import { Box } from '@chakra-ui/react';
import { useSettings } from '@/apis/setting';
import Loading from '@/components/loading';

const SettingsForm = dynamic(() => import('./form'), { ssr: true });

export default function SettingsView() {
    const { data } = useSettings();

    return (
        <Box p="2rem">
            {!data ? <Loading /> : <SettingsForm />}
        </Box>
    );
}
