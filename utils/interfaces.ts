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
