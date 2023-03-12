import { AxiosError } from 'axios';
import useSWR from 'swr';
import client from '@/lib/client';

export interface RequestCast {
    mutate: any;
    error: AxiosError<unknown> | undefined;
    data: {
        _id: string;
        title: string;
        logo: string;
        locales: string[];
        under_construction: boolean;
        under_maintenance: boolean;
    }
}

export function useSettings() {
    const { data, error, mutate } = useSWR('api/setting');
    return { data, error, mutate } as RequestCast;
}

export function editSettings(values: FormData) {
    return client.post('api/setting/edit', values);
}
