import dbConnect from "../../../lib/dbConnect";
import authenticated from "../../../middlewares/authenticated";
import User from '../../../models/User';

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try{
                const {user} = req;
                const data = await User.findById(user.userId);
                res.status(200).json({ success: true, data:{user:data} })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}

export default authenticated(handler, {
    'GET':{
        active:true,
        roles:[]
    }
});