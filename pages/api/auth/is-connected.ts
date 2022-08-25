import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

export type UserSession = {
    isLogged: boolean;
    data: Record<string, string>;
}

async function isConnected(request: NextApiRequest, response: NextApiResponse) {
    if (request.session.user) {
        response.json({ ...request.session.user, isLogged: true });
        return false;
    }

    response.json({ isLogged: false, data: null });
}

export default withIronSessionApiRoute(isConnected, sessionOptions);
