import client, { fetcher } from '@/lib/client';
import useSWR from 'swr';

export function createAdminUser(values) {
    return client.post('api/instalation', values);
}

export function useFirstInstallTime() {
    const { data, error, mutate } = useSWR('api/is-first-install-time', fetcher);
    return { data, error, mutate };
}
