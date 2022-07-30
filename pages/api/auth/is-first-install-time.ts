import { NextApiResponse } from 'next';
import dbConnect from '@/lib/connect';

export default function isFirstInstallTime(_, response: NextApiResponse) {
    return new Promise(async (resolve, reject) => {
        try {
            const mongoose = await dbConnect();
            mongoose.connection.db.listCollections({ name: 'users' }).next((_, collection) => {
                if (collection) {
                    response.status(200).json({ exist: true });
                    resolve(true);

                    return true;
                }

                response.status(200).json({ exist: false });
                resolve(false);
            });
        } catch (e) {
            response.status(500).json(e);
            reject();
        }
    });
}
