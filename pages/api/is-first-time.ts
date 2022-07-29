import { NextApiResponse } from 'next';
import dbConnect from '@/lib/connect';

export default function isFirstTime(_, response: NextApiResponse) {
    return new Promise(async (resolve, reject) => {
        try {
            const mongoose = await dbConnect();
            mongoose.connection.db.listCollections({name: 'users'}).next((e, c) => {
                if (c) {
                    response.status(200).json({ exist: true });
                    resolve(true);
                } else {
                    response.status(200).json({ exist: false });
                    resolve(false);
                }
            })
        } catch (e) {
            response.status(500).json(e);
            reject();
        }
    });
}
