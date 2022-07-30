import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then(res => res.data);

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
