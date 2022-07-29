import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/connect';
import User from '@/models/user';

export default function Instalation(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        return new Promise(async (resolve, reject) => {
            try {
                await dbConnect();

                const { body } = request;

                const user = new User({
                    first_name: body.first_name,
                    last_name: body.last_name,
                    email: body.email,
                    password: body.password,
                    role: 'admin',
                    status: true,
                });
                await user.save();

                response.status(202).json({ success: true });
                resolve(null);
            } catch (e) {
                response.status(500).json({ success: false, message: 'We fail to register the user' });
                reject(null);
            }
        });
    } else {
        response.status(405).json({ error: 'Method not allowed' });
    }
}
