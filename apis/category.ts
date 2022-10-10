import client from '@/lib/client';

export function createCategory(values: Record<string, string | boolean>) {
    return client.post('api/category/create', values);
}
