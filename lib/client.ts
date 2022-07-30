import axios from 'axios';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    timeout: 20000,
});

export const fetcher = (url: string) => client.get(url).then(response => response.data);

export default client;
