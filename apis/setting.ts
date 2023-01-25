import useSWR from 'swr';
import { RequestCast } from '@/utils/interfaces';

export function useSettings() {
    const { data, error, mutate } = useSWR('api/setting');
    return { data, error, mutate } as RequestCast;
}
