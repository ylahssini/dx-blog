import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/connect';
import Post from '@/models/blogpost';

const defaultLimit = parseFloat(process.env.NEXT_PUBLIC_LIMIT) as unknown as number;

function PostList(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        return new Promise(async (resolve, reject) => {
            try {
                const mongoose = await dbConnect();

                mongoose.connection.db.listCollections({ name: 'blog_posts' }).next(async () => {
                    try {
                        const { skip, limit, populate, filters } = request.query;

                        const query: Record<string, string | RegExp | boolean> = {};
                        if (filters) {
                            const parseFilter = JSON.parse(filters as string);

                            if (typeof parseFilter.title === 'string') {
                                query.title = new RegExp(parseFilter.title, 'gi');
                            }

                            if (['DRAFT', 'DISABLED', 'PUBLISHED'].includes(parseFilter.status)) {
                                query.status = parseFilter.status;
                            }
                        }
                        
                        const options: Record<string, number> = {};
                        if (skip) options.skip = parseInt(skip as string, 10);
                        if (limit) options.limit = parseInt(limit as string, 10) || defaultLimit;

                        let postQuery = Post.find(query, null, options);
                        if (populate === 'category') postQuery = postQuery.populate('category');

                        const items = await postQuery.exec();
                        const count = await Post.find(query).count();

                        response.status(200).json({ success: true, list: { count, items } });

                        resolve(null);
                    } catch (error) {
                        response.status(500).json({ success: false, message: 'Fail to get posts', error });
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

export default PostList;
