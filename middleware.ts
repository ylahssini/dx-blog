import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { verify } from './lib/token';

export default async function middleware(request: NextRequest) {
    function redirectController() {
        if (request.url.includes('api/')) {
            return NextResponse.redirect(new URL('/api/auth/not-authorized', request.url));
        }

        return NextResponse.redirect(new URL('/', request.url));
    }

    try {
        const authorization = request.headers.get('authorization') || request.cookies.get('token');

        if (!authorization) {
            return redirectController();
        }

        const isAuthorized = await verify(authorization.replace('Bearer ', ''));

        if (isAuthorized) {
            return NextResponse.next();
        }

        return redirectController();
    } catch (error) {
        console.log(error);
        return redirectController();
    }
}

export const config = {
    matcher: [
        '/_/:path*',
        '/api/category/:path*',
    ],
};
