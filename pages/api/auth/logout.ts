import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

function logout(request: NextApiRequest, response: NextApiResponse) {
    request.session.destroy();
    response.status(200).json({ message: 'user log out successfuly' });
}

export default withIronSessionApiRoute(logout, sessionOptions);
