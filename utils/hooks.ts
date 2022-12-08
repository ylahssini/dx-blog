import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { UserSession } from '@/pages/api/auth/is-connected';

export const useIsConnected = ({ to = '/_/', redirectIfFound = false }: { to?: string; redirectIfFound?: boolean } = {}) => {
    const { data: user, mutate } = useSWR<UserSession>('api/auth/is-connected');
    const { push } = useRouter();

    if (!user) {
        return { user: null, mutate };
    }

    if ((to && !redirectIfFound && !user?.isLogged) || (redirectIfFound && user?.isLogged)) {
        push(to);
        return { user: null, mutate };
    }

    return { user, mutate };
};

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
