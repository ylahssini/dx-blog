import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import mv from 'mv';
import path from 'path';
import { withIronSessionApiRoute } from 'iron-session/next';
import dbConnect from '@/lib/connect';
import { verify } from '@/lib/token';
import Setting from '@/models/setting';
import { sessionOptions } from '@/lib/session';

async function EditSettings(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        return new Promise(async (resolve, reject) => {
            try {
                const mongoose = await dbConnect();

                mongoose.connection.db.listCollections({ name: 'settings' }).next(async () => {
                    try {
                        const user = await verify(request.session.user.token, true) as { id: string };
                        const [settings] = await Setting.find().exec();

                        const form = formidable({ keepExtensions: true });

                        form.parse(request, (error, fields, files) => {
                            if (error) {
                                console.log(error);
                                response.status(500).json({ success: false, message: 'Error occured when uploading logo' });
                                return false;
                            }

                            const oldPath = files.logo.filepath;
                            const directory = path.join(process.cwd(), 'public/uploads');
                            const filePath = path.join(directory, files.logo.originalFilename);

                            mv(oldPath, filePath, async function(err) {
                                if (err) {
                                    console.log(err);
                                    response.status(500).json({ success: false, message: 'Error occured when moving logo' });
                                    return false;
                                }

                                await Setting.updateOne({ _id: new mongoose.Types.ObjectId(settings._id) }, {
                                    title: fields.title,
                                    locales: fields.locales.split(','),
                                    under_construction: fields.under_construction === 'true',
                                    under_maintenance: fields.under_maintenance === 'true',
                                    logo: filePath.replace(path.join(process.cwd(), 'public'), ''),
                                    created_by: new mongoose.Types.ObjectId(user.id),
                                });

                                response.status(202).json(settings);
                            });
                        });

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

export const config = {
    api: {
       bodyParser: false,
    }
};

export default withIronSessionApiRoute(EditSettings, sessionOptions);
