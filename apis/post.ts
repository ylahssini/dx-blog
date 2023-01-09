import { useMemo } from 'react';
import useSWR from 'swr';
import client from '@/lib/client';
import { queryString } from '@/utils/functions';
import type { RequestPayload, RequestCast } from '@/utils/interfaces';

export function addPost(values: Record<string, string | boolean>) {
    return client.post('api/post/create', values);
}

export function editPost(values: Record<string, string | boolean>) {
    return client.put('api/post/edit', values);
}

export function usePosts({ limit = process.env.NEXT_PUBLIC_LIMIT as unknown as number, skip = 0, filters }: RequestPayload = {}) {
    const queryFilters = useMemo(() => (filters || []).filter((filter) => filter.value !== '').reduce((acc, curr) => ({ ...acc, [curr.key as string]: curr.value }), {}), [filters]);

    const query = queryString({
        limit: limit.toString(),
        skip: skip.toString(),
        filters: JSON.stringify(queryFilters),
    });

    const { data, error, mutate } = useSWR(`api/post/list?${query}`);

    return { data, error, mutate } as RequestCast;
}
