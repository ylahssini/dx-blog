import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import pick from 'lodash/pick';
import dbConnect from '@/lib/connect';
import User from '@/models/user';
import { sessionOptions } from '@/lib/session';
import { sign } from '@/lib/token';
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
                            const message = 'The email or password are not correct';
                            response.status(406).json({ success: false, message, error });
                            reject();
                            return;
                        }

                        const userData = pick(user, ['first_name', 'last_name', 'email', 'role', 'status']);
                        const token = await sign({ id: user.id, role: userData.role });
                        request.session.user = { data: userData, isLogged: true, token } as UserSession;
                        await request.session.save();

                        response.status(200).json({ success: true, token });

                        resolve(null);
                        return;
                    });
                });
            } catch (error) {
                response.status(500).json({ success: false, message: 'Error occured in logging in', error });
                reject();
                return;
            }
        });
    }

    response.status(405).json({ success: false, message: 'The method is not allowed' });
}

export default withIronSessionApiRoute(login, sessionOptions);
