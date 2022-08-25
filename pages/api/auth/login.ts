import dbConnect from '@/lib/connect';
import User from '@/models/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        return new Promise(async (resolve, reject) => {
            try {
                await dbConnect();

                User.findOne({ email: request.body.email }, (error, user) => {
                    if (error) return reject(error);

                    user.comparePassword(request.body.password, (err, isMatched) => {
                        if (err) return reject(error);

                        if (!isMatched) {
                            return reject({ error: 'The password is incorrect' });
                        }

                        return resolve(null);
                    });
                });
            } catch (error) {
                response.status(500).json({ success: false, message: 'Error occured in logging in', error });
                reject();
                return false;
            }
        });
    }

    response.status(405).json({ success: false, message: 'The method is not allowed' });
}
