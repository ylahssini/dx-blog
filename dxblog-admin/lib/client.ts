import Router from 'next/router';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { COOKIE_OPTIONS } from '@/utils/constants';

const cookie = new Cookies();

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    timeout: 20000,
});

client.interceptors.request.use((config) => {
    if (cookie.get('token')) {
        config.headers.Authorization = `Bearer ${cookie.get('token')}`;
    }

    return config;
});

client.interceptors.response.use((response) => response, (error) => {
    if (error?.response?.status === 401) {
        cookie.remove('token', COOKIE_OPTIONS);
        Router.push('/');
        return Promise.reject();
    }

    return Promise.reject(error);
});

export const fetcher = (url: string) => client.get(url).then(response => response.data);

export default client;
