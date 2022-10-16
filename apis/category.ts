import client from '@/lib/client';
import { useRequest } from '@/utils/hooks';
import { RequestCast } from '@/utils/interfaces';

export function createCategory(values: Record<string, string | boolean>) {
    return client.post('api/category/create', values);
}

export function editCategory(values: Record<string, string | boolean>) {
    return client.put('api/category/edit', values);
}

export function useCategories({ limit = 3, skip = 0 }: { limit?: number; skip?: number } = {}) {
    const { data, error, mutate } = useRequest({
        url: '/api/category/list',
        params: { limit, skip },
    }) as RequestCast;
    return { data, error, mutate };
}
