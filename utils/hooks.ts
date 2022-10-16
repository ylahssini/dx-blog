import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { UserSession } from '@/pages/api/auth/is-connected';

export const useIsConnected = ({ to = '/', redirectIfFound = false }: { to?: string; redirectIfFound?: boolean } = {}) => {
    const { data: user, mutate } = useSWR<UserSession>('api/auth/is-connected');

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
