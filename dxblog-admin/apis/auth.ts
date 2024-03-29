import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import client from '@/lib/client';

export function createAdminUser(values: Record<string, any>) {
    return client.post('api/auth/installation', values);
}

export function login(values: { email: string; password: string }) {
    return client.post('api/auth/login', values);
}

export function logout() {
    return client.post('api/auth/logout');
}

export function useFirstInstallTime() {
    const { data, error, mutate } = useSWR('api/auth/is-first-install-time');
    return { data, error, mutate };
}

export default function useAuth({ redirectTo = '', redirectIfFound = false } = {}) {
    const { data, mutate } = useSWR('api/auth/login');
    const { push } = useRouter();

    useEffect(() => {
        if (!redirectTo || !data) return;

        if (
            (redirectTo && !redirectIfFound && !data?.isLoggedIn) ||
            (redirectIfFound && data?.isLoggedIn)
        ) {
            push(redirectTo);
        }
    }, [data, redirectIfFound, redirectTo]);

    return { data, mutate };
}