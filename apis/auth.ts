import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import client, { fetcher } from '@/lib/client';

export function createAdminUser(values) {
    return client.post('api/auth/instalation', values);
}

export function useFirstInstallTime() {
    const { data, error, mutate } = useSWR('api/auth/is-first-install-time', fetcher);
    return { data, error, mutate };
}

export default function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
    const { data: user, mutate: mutateUser } = useSWR('/api/user', fetcher);

    useEffect(() => {
        if (!redirectTo || !user) return;

        if (
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            (redirectIfFound && user?.isLoggedIn)
        ) {
            Router.push(redirectTo);
        }
    }, [user, redirectIfFound, redirectTo]);

    return { user, mutateUser };
}