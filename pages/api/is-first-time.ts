import dbConnect from '@/lib/connect';

export default function handler(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await dbConnect();
            connection.connection.db.listCollections({name: 'users'}).next((e, c) => {
                if (c) {
                    res.status(200).json({ exist: true });
                    resolve(true);
                } else {
                    res.status(200).json({ exist: false });
                    resolve(false);
                }
            })
        } catch (e) {
            res.status(500).json(e);
            reject();
        }
    });
}
