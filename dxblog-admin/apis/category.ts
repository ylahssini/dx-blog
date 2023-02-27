import { useMemo } from 'react';
import useSWR from 'swr';
import client from '@/lib/client';
import { queryString } from '@/utils/functions';
import type { RequestPayload, RequestCast } from '@/utils/interfaces';

export function createCategory(values: Record<string, string | boolean>) {
    return client.post('api/category/create', values);
}

export function editCategory(values: Record<string, string | boolean>) {
    return client.put('api/category/edit', values);
}

export function useCategories({ limit = process.env.NEXT_PUBLIC_LIMIT as unknown as number, skip = 0, filters }: RequestPayload = {}) {
    const queryFilters = useMemo(() => (filters || []).filter((filter) => filter.value !== '').reduce((acc, curr) => ({ ...acc, [curr.key as string]: curr.value }), {}), [filters]);

    const query = queryString({
        limit: limit.toString(),
        skip: skip.toString(),
        filters: JSON.stringify(queryFilters),
    });

    const { data, error, mutate } = useSWR(`api/category/list?${query}`);

    return { data, error, mutate } as RequestCast;
}

export function getCategories(params: Record<string, string>) {
    const query = queryString(params);
    return client.get(`api/category/list?${query}`);
}
