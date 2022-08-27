import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import pick from 'lodash/pick';
import dbConnect from '@/lib/connect';
import User from '@/models/user';
import { sessionOptions } from '@/lib/session';
import { UserSession } from './is-connected';

async function login(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        return new Promise(async (resolve, reject) => {
            try {
                await dbConnect();

                User.findOne({ email: request.body.email }, (error, user) => {
                    if (error) return reject(error);

                    user.comparePassword(request.body.password, async (err, isMatched) => {
                        if (err) return reject(error);

                        if (!isMatched) {
                            return reject({ error: 'The password is incorrect' });
                        }

                        const userData = pick(user, ['first_name', 'last_name', 'email', 'role', 'status']);
                        request.session.user = { data: userData, isLogged: true} as UserSession;
                        await request.session.save();

                        response.status(200).json({ success: true, user: userData });

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

export default withIronSessionApiRoute(login, sessionOptions);
