import { sessionOptions } from '@/lib/session';
import { sleep } from '@/utils/functions';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

async function logout(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        request.session.destroy();

        await sleep(2000); // fake waiting
        response.status(200).json({ sucess: true, message: 'user log out successfuly' });

        return false;
    }

    response.status(405).json({ sucess: false, message: 'Method not allowed' });
}

export default withIronSessionApiRoute(logout, sessionOptions);
