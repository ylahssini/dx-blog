import dbConnect from '@/lib/connect';
import Category from '@/models/category';
import { NextApiRequest, NextApiResponse } from 'next';

const defaultLimit = process.env.NEXT_PUBLIC_LIMIT as unknown as number;

function CategoryList(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        return new Promise(async (resolve, reject) => {
            try {
                const mongoose = await dbConnect();

                mongoose.connection.db.listCollections({ name: 'categories' }).next(async () => {
                    try {
                        const { skip, limit, filters } = request.query;

                        const query: Record<string, string | RegExp | boolean> = {};
                        if (filters) {
                            const parseFilter = JSON.parse(filters as string);

                            if (typeof parseFilter.name === 'string') {
                                query.name = new RegExp(parseFilter.name, 'gi');
                            }

                            if (typeof parseFilter.description === 'string') {
                                query.description = new RegExp(parseFilter.description, 'gi');
                            }

                            if (['true', 'false'].includes(parseFilter.status)) {
                                query.status = parseFilter.status === 'true';
                            }
                        }

                        // @ts-ignore
                        const items = await Category.find(query, null, { skip: skip || 0, limit: limit || defaultLimit }).exec();
                        const count = await Category.find(query).count();

                        response.status(200).json({ success: true, list: { count, items } });

                        resolve(null);
                    } catch (error) {
                        response.status(500).json({ success: false, message: 'Fail to get categories', error });
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

export default CategoryList;
