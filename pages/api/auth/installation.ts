import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/connect';
import User from '@/models/user';
import Setting from '@/models/setting';

export default function Installation(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        return new Promise(async (resolve, reject) => {
            try {
                const mongoose = await dbConnect();

                mongoose.connection.db.listCollections({ name: 'users' }).next(async (_, collection) => {
                    try {
                        if (collection) {
                            response.status(401).json({ message: 'The admin user already created' });
                            reject(false);
                            return false;
                        }

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
                        
                        const setting = new Setting({
                            title: body.title,
                            logo: '',
                            locales: body.locales,
                        });
                        await setting.save();

                        response.status(202).json({ success: true });
                        resolve(null);
                    } catch (error) {
                        response.status(500).json({ success: false, message: 'We fail to register the user', error });
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
