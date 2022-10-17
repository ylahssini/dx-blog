export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function stringToColor(string: string) {
    let hash = 0;

    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += (`00${value.toString(16)}`).substring(-2);
    }

    return color;
}

export function queryString(params: Record<string, string>): string {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value && value !== '{}') {
            query.set(key, value);
        }
    });

    return query.toString();
}
