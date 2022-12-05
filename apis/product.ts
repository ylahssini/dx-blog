import { useMemo } from 'react';
import useSWR from 'swr';
import client from '@/lib/client';
import { queryString } from '@/utils/functions';
import type { RequestPayload, RequestCast } from '@/utils/interfaces';

export function createProduct(values: Record<string, string | boolean>) {
    return client.post('api/product/create', values);
}

export function editProduct(values: Record<string, string | boolean>) {
    return client.put('api/product/edit', values);
}

export function useProducts({ limit = process.env.NEXT_PUBLIC_LIMIT as unknown as number, skip = 0, filters }: RequestPayload = {}) {
    const queryFilters = useMemo(() => (filters || []).filter((filter) => filter.value !== '').reduce((acc, curr) => ({ ...acc, [curr.key as string]: curr.value }), {}), [filters]);

    const query = queryString({
        limit: limit.toString(),
        skip: skip.toString(),
        filters: JSON.stringify(queryFilters),
    });

    const { data, error, mutate } = useSWR(`api/product/list?${query}`);

    return { data, error, mutate } as RequestCast;
}
