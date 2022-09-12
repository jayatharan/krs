import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import bcrypt from "bcrypt";
import authenticated from '../../../middlewares/authenticated';

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const { page = 1, limit = 100, search } = req.query;
                let filter = {};
                if (search) {
                    filter = {
                        $or: [
                            { username: { $regex: search, $options: 'si' } },
                            { email: { $regex: search, $options: 'si' } },
                            { mobile: { $regex: search, $options: 'si' } }
                        ]
                    }
                }
                const p = Number.parseInt(page)
                const l = Number.parseInt(limit)
                const users = await User.find(filter).limit(l).skip((p-1)*l)
                res.status(200).json({ success: true, data: users })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const data = req.body
                const salt = await bcrypt.genSalt(10)
                data.password = await bcrypt.hashSync(data.password, salt);
                const user = await User.create(data)
                res.status(201).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}

export default authenticated(handler, {
    'GET': {
        active: true,
        roles: ['admin', 'super-admin']
    },
    'POST': {
        active: true,
        roles: ['admin', 'super-admin']
    }
})