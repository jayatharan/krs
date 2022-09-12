import dbConnect from "../../../lib/dbConnect"
import User from '../../../models/User'
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
                const {refreshToken} = req.body
                try{
                    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
                    const user = await User.findById(decoded.userId);
                    const accessToken = await jwt.sign({userId: user._id, role: user.role, verified: user.verified, mobile: user.mobile}, JWT_ACCESS_SECRET, {expiresIn: JWT_ACCESS_TIME})
                    res.status(200).json({ success: true , data: {accessToken, refreshToken}})
                }catch (error){
                    res.status(401).json({ success:false, message:'Refresh token expired' });
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