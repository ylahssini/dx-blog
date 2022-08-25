import type { UserSession } from '@/pages/api/auth/is-connected';
import type { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'minicrm-user',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

declare module 'iron-session' {
    interface IronSessionData {
        user: UserSession,
    }
}
