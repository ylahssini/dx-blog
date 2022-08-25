import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import client, { fetcher } from '@/lib/client';

export function createAdminUser(values) {
    return client.post('api/auth/instalation', values);
}

export function login(values) {
    return client.post('api/auth/login', values);
}

export function useFirstInstallTime() {
    const { data, error, mutate } = useSWR('api/auth/is-first-install-time', fetcher);
    return { data, error, mutate };
}

export default function useAuth({ redirectTo = '', redirectIfFound = false } = {}) {
    const { data, mutate } = useSWR('api/auth/login', fetcher);

    useEffect(() => {
        if (!redirectTo || !data) return;

        if (
            (redirectTo && !redirectIfFound && !data?.isLoggedIn) ||
            (redirectIfFound && data?.isLoggedIn)
        ) {
            Router.push(redirectTo);
        }
    }, [data, redirectIfFound, redirectTo]);

    return { data, mutate };
}