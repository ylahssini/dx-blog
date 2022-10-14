import { NextApiResponse } from 'next';

async function NotAuthorized(_, response: NextApiResponse) {
    response.status(401).json({ success: false, message: 'You are not authorized', });
}

export default NotAuthorized;
