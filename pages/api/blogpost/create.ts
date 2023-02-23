import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/connect';
import { withIronSessionApiRoute } from 'iron-session/next';
import BlogPost from '@/models/blogpost';
import { sessionOptions } from '@/lib/session';
import { verify } from '@/lib/token';

function CreatePost(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        return new Promise(async (resolve, reject) => {
            try {
                const mongoose = await dbConnect();

                mongoose.connection.db.listCollections({ name: 'blog_posts' }).next(async () => {
                    const { body } = request;

                    try {
                        const user = await verify(request.session.user.token, true) as { id: string };

                        const post = new BlogPost({
                            title: body.title,
                            content: body.content,
                            locale: body.locale,
                            path: body.path,
                            status: body.status,
                            category_id: body.category || null,
                            equivalent_to_locale_post: body.equivalent_to_locale_post || null,
                            meta: {
                                title: body.meta_title,
                                description: body.meta_description,
                                keywords: '',
                            },
                            created_by: new mongoose.Types.ObjectId(user.id),
                        });
                        await post.save();

                        response.status(202).json({ success: true });
                        resolve(null);
                    } catch (error) {
                        let message = `We fail to create a post: ${body.title}`;

                        if (error?.code === 11000) {
                            message = `The path is already existed: "${body.path}"`;
                        }

                        response.status(500).json({ success: false, message, error });
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

export default withIronSessionApiRoute(CreatePost, sessionOptions);
