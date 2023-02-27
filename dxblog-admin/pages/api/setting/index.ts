import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/connect';
import Setting from '@/models/setting';

function Settings(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        return new Promise(async (resolve, reject) => {
            try {
                const mongoose = await dbConnect();

                mongoose.connection.db.listCollections({ name: 'settings' }).next(async () => {
                    try {
                        const [settings] = await Setting.find().exec();

                        response.status(200).json(settings);

                        resolve(null);
                    } catch (error) {
                        response.status(500).json({ success: false, message: 'Fail to get settings', error });
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

export default Settings;
