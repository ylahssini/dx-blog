import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { ModelUser } from '@/models/user';

export type UserSession = {
    isLogged: boolean;
    data: ModelUser;
}

async function isConnected(request: NextApiRequest, response: NextApiResponse) {
    if (request.session.user) {
        response.json({ ...request.session.user, isLogged: true });
        return false;
    }

    response.json({ isLogged: false, data: null });
}

export default withIronSessionApiRoute(isConnected, sessionOptions);
