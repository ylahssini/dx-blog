import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '@/lib/session';

async function NotAuthorized(request: NextApiRequest, response: NextApiResponse) {
    request.session.destroy();
    response.status(401).json({ success: false, message: 'You are not authorized', });
}

export default withIronSessionApiRoute(NotAuthorized, sessionOptions);
