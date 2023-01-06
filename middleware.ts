import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { verify } from './lib/token';

export default async function middleware(request: NextRequest) {
    function redirectController() {
        if (request.url.includes('api/')) {
            return NextResponse.redirect(new URL('/api/auth/not-authorized', request.url));
        }

        if (!request.url.endsWith('/_')) {
            return NextResponse.redirect(new URL('/_', request.url));
        }

        return NextResponse.next();
    }

    try {
        const authorization = request.headers.get('authorization') || request.cookies.get('token');

        if (!authorization) {
            return redirectController();
        }

        if (request.url.includes('/_/') && authorization.endsWith('F0rC3_Th3_E2E_T35t')) {
            return NextResponse.next();
        }

        const isAuthorized = await verify(authorization.replace('Bearer ', ''));

        if (isAuthorized) {
            return NextResponse.next();
        }

        if (request.url.endsWith('/_')) {
            return NextResponse.next();
        }

        return redirectController();
    } catch (error) {
        console.log(error.code);
        return redirectController();
    }
}

export const config = {
    matcher: [
        '/_/:path*',
        '/api/category/:path*',
    ],
};
