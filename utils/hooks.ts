import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { UserSession } from '@/pages/api/auth/is-connected';

export const useIsConnected = () => {
    const { data: user, mutate } = useSWR<UserSession>('api/auth/is-connected');

    if (!user) {
        return { user: null, mutate };
    }

    if (!user?.isLogged) {
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
