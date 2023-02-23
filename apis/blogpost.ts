import { useMemo } from 'react';
import useSWR from 'swr';
import client from '@/lib/client';
import { queryString } from '@/utils/functions';
import type { RequestPayload, RequestCast } from '@/utils/interfaces';

export function addBlogPost(values: Record<string, string | boolean>) {
    return client.post('api/blogpost/create', values);
}

export function editBlogPost(values: Record<string, string | boolean>) {
    return client.put('api/blogpost/edit', values);
}

export function useBlogPosts({ limit = process.env.NEXT_PUBLIC_LIMIT as unknown as number, skip = 0, populate, filters }: RequestPayload = {}) {
    const queryFilters = useMemo(() => (filters || [])
        .filter((filter) => filter.value.length !== 0)
        .reduce((acc, curr) => ({ ...acc, [curr.key as string]: curr.value })
    , {}), [filters]);

    const query = queryString({
        limit: limit.toString(),
        skip: skip.toString(),
        filters: JSON.stringify(queryFilters),
        populate,
    });

    const { data, error, mutate } = useSWR(`api/blogpost/list?${query}`);

    return { data, error, mutate } as RequestCast;
}

export function getBlogPosts(params: Record<string, string>) {
    const query = queryString(params);
    return client.get(`api/blogpost/list?${query}`);
}
