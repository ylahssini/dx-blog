import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/connect';
import Category from '@/models/category';

const defaultLimit = parseFloat(process.env.NEXT_PUBLIC_LIMIT) as unknown as number;

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

                            if (typeof parseFilter.original_name === 'string') {
                                query.original_name = new RegExp(parseFilter.original_name, 'gi');
                            }

                            if (['true', 'false'].includes(parseFilter.status)) {
                                query.status = parseFilter.status === 'true';
                            }
                        }
                        
                        const options: Record<string, number> = {};
                        if (skip) options.skip = parseInt(skip as string, 10);
                        if (limit) options.limit = parseInt(limit as string, 10) || defaultLimit;

                        const items = await Category.find(query, null, options).exec();
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
