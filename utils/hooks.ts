import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/lib/client';
import { UserSession } from '@/pages/api/auth/is-connected';

export const useIsConnected = ({ to = '/', redirectIfFound = false }: { to?: string; redirectIfFound?: boolean }) => {
    const { data: user, mutate } = useSWR<UserSession>('api/auth/is-connected', fetcher);

    useEffect(() => {
        if (!user) {
            return;
        }

        if ((to && !redirectIfFound && !user?.isLogged) || (redirectIfFound && user?.isLogged)) {
            Router.push(to);
        }
    }, [user]);

    return { user, mutate };
};
