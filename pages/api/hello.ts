import dbConnect from '../../lib/connect';

export default async function handler(req, res) {
    try {
        await dbConnect();
        res.status(200).json({ name: 'John Doe' })
    } catch (e) {
        res.status(200).json(e)
    }
}
