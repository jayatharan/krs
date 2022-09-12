import dbConnect from "../../../lib/dbConnect";
import User from '../../../models/User';
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            try{
                const data = req.body
                const salt = await bcrypt.genSalt(10)
                data.password = await bcrypt.hashSync(data.password, salt);
                const user = await User.create(data)
                res.status(200).json({ success: true , data: user})
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}