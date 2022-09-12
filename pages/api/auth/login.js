import dbConnect from "../../../lib/dbConnect";
import User from '../../../models/User';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const JWT_ACCESS_SECRET = process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET
const JWT_ACCESS_TIME = process.env.NEXT_PUBLIC_JWT_ACCESS_TIME
const JWT_REFRESH_SECRET = process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET
const JWT_REFRESH_TIME = process.env.NEXT_PUBLIC_JWT_REFRESH_TIME

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            try{
                const {mobile, password} = req.body
                const user = await User.findOne({
                    mobile
                })
                if(!user) res.status(401).json({ success:false, message:'User not found' });
                else{
                    const isValid = await bcrypt.compare(password, user.password);
                    if(!isValid) res.status(401).json({ success:false, message:'Password not matched' });
                    else {
                        const accessToken = await jwt.sign({userId: user._id, role: user.role, verified: user.verified, mobile: user.mobile}, JWT_ACCESS_SECRET, {expiresIn: JWT_ACCESS_TIME})
                        const refreshToken = jwt.sign({userId: user._id}, JWT_REFRESH_SECRET, {expiresIn: JWT_REFRESH_TIME})
                        res.status(200).json({ success: true , data: {accessToken, refreshToken}})
                    }
                }
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}