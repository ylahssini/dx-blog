import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { ModelUser } from '@/models/user';

export type UserSession = {
    isLogged: boolean;
    data: ModelUser;
    token: string;
}

async function isConnected(request: NextApiRequest, response: NextApiResponse) {
    if (request.session.user) {
        response.json({ ...request.session.user, isLogged: true });
        return false;
    }

    response.json({ isLogged: false, data: null, token: null });
}

export default withIronSessionApiRoute(isConnected, sessionOptions);
