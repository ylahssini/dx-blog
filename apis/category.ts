import client from '@/lib/client';
import { type RequestCast } from '@/utils/interfaces';
import useSWR from 'swr';

export function createCategory(values: Record<string, string | boolean>) {
    return client.post('api/category/create', values);
}

export function editCategory(values: Record<string, string | boolean>) {
    return client.put('api/category/edit', values);
}

export function useCategories({ limit = process.env.NEXT_PUBLIC_LIMIT as unknown as number, skip = 0 }: { limit?: number; skip?: number } = {}) {
    const { data, error, mutate } = useSWR(`api/category/list?skip=${skip}&limit=${limit}`);
    return { data, error, mutate } as RequestCast;
}
