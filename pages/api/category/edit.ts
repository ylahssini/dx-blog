import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/connect';
import { withIronSessionApiRoute } from 'iron-session/next';
import Category from '@/models/category';
import { sessionOptions } from '@/lib/session';
import { verify } from '@/lib/token';

function EditCategory(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'PUT') {
        return new Promise(async (resolve, reject) => {
            try {
                const mongoose = await dbConnect();

                mongoose.connection.db.listCollections({ name: 'categories' }).next(async () => {
                    const { body } = request;

                    try {
                        const user = await verify(request.session.user.token, true) as { id: string };

                        await Category.updateOne({ _id: new mongoose.Types.ObjectId(body.category_id) }, {
                            name: body.name,
                            description: body.description,
                            status: body.status,
                            created_by: new mongoose.Types.ObjectId(user.id),
                        });

                        response.status(202).json({ success: true });
                        resolve(null);
                    } catch (error) {
                        response.status(500).json({ success: false, message: 'We fail to edit the category: ' + body.name, error });
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

export default withIronSessionApiRoute(EditCategory, sessionOptions);
