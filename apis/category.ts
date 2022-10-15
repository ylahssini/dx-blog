import useSWR from 'swr';
import client, { fetcher } from '@/lib/client';

export function createCategory(values: Record<string, string | boolean>) {
    return client.post('api/category/create', values);
}

export function useCategories() {
    const { data, error, mutate } = useSWR('api/category/list', fetcher);
    return { data, error, mutate };
}
