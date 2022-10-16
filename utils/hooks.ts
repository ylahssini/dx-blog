/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react';
import Router from 'next/router';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { UserSession } from '@/pages/api/auth/is-connected';

export type GetRequest = AxiosRequestConfig | null

interface Return<Data, Error> extends Pick<SWRResponse<AxiosResponse<Data>, AxiosError<Error>>, 'isValidating' | 'error' | 'mutate'> {
    data: Data | undefined
    response: AxiosResponse<Data> | undefined
}

export interface Config<Data = unknown, Error = unknown> extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'fallbackData'> {
    fallbackData?: Data
}

export const useIsConnected = ({ to = '/', redirectIfFound = false }: { to?: string; redirectIfFound?: boolean } = {}) => {
    const { data: user, mutate } = useSWR<UserSession>('api/auth/is-connected');

    useEffect(() => {
        if (!user) {
            return;
        }

        if ((to && !redirectIfFound && !user?.isLogged) || (redirectIfFound && user?.isLogged)) {
            Router.push(to);
        }
    }, [user]);

    return { user, mutate };
};

export function useRequest<Data = unknown, Error = unknown>(
    request: GetRequest,
    { fallbackData, ...config }: Config<Data, Error> = {},
): Return<Data, Error> {
    const { data: response, error, isValidating, mutate } = useSWR<
        AxiosResponse<Data>,
        AxiosError<Error>
    >(
        request && JSON.stringify(request),
        // * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
        // * function is actually only called by `useSWR` when it isn't.
        () => axios.request<Data>(request!),
        {
            ...config,
            fallbackData: fallbackData && {
                status: 200,
                statusText: 'InitialData',
                config: request!,
                headers: {},
                data: fallbackData,
            },
        },
    );

    return {
        data: response && response.data,
        response,
        error,
        isValidating,
        mutate,
    };
}
