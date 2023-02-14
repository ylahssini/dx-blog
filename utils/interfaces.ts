import { AxiosError } from 'axios';

export interface RequestCast {
    mutate: any;
    error: AxiosError<unknown> | undefined;
    data: {
        list: {
            count: number;
            items: Record<string, any>[];
        };
    }
}

export interface RequestPayload {
    limit?: number;
    skip?: number;
    populate?: string;
    filters?: Record<string, string | unknown>[];
}
