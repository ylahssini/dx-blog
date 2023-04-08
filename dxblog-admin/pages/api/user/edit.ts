import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import dbConnect from '@/lib/connect';
import User from '@/models/user';
import { sessionOptions } from '@/lib/session';
import { verify } from '@/lib/token';

function EditUser(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'PUT') {
        return new Promise(async (resolve, reject) => {
            try {
                const mongoose = await dbConnect();

                mongoose.connection.db.listCollections({ name: 'users' }).next(async () => {
                    const { body } = request;

                    try {
                        const user = await verify(request.session.user.token, true) as { id: string };

                        await User.updateOne({ _id: new mongoose.Types.ObjectId(body.user_id) }, {
                            first_name: body.first_name,
                            last_name: body.last_name,
                            email: body.email,
                            password: body.password,
                            roles: body.roles,
                            status: body.status,
                            created_by: new mongoose.Types.ObjectId(user.id),
                        });

                        response.status(202).json({ success: true });
                        resolve(null);
                    } catch (error) {
                        response.status(500).json({ success: false, message: `We fail to edit the user: ${body.name}`, error });
                        reject(error);
                    }
                });
            } catch (error) {
                response.status(500).json({ success: false, message: 'Error to connect database', error });
                reject(error);
            }
        });
    }

    response.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withIronSessionApiRoute(EditUser, sessionOptions);
