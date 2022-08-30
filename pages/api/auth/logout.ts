import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

function logout(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        request.session.destroy();
        response.status(200).json({ sucess: true, message: 'user log out successfuly' });
    }

    response.status(405).json({ sucess: false, message: 'Method not allowed' });
}

export default withIronSessionApiRoute(logout, sessionOptions);
