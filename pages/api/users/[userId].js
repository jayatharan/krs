import dbConnect from '../../../lib/dbConnect'
import authenticated from '../../../middlewares/authenticated';
import User from '../../../models/User'

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch(method) {
        case 'GET':
            try{
                const {userId} = req.query;
                const user = await User.findById(userId);
                if(!user) throw new Error("Not Found");
                res.status(200).json({success:true, data:user})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try{
                const {userId} = req.query;
                const user = await User.findById(userId);
                if(!user) throw new Error("Not Found");
                const data = req.body;
                if(data.username != undefined){
                    user.username = data.username
                }

                if(data.email != undefined){
                    user.email = data.email
                }

                if(data.mobile != undefined){
                    user.mobile = data.mobile
                }

                if(data.role != undefined){
                    user.role = data.role
                }

                if(data.verified != undefined){
                    user.verified = data.verified
                }

                await user.save();
                res.status(200).json({success:true, data:user})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try{
                const {userId} = req.query;
                await User.deleteOne({_id:userId})
                res.status(200).json({ success: true })
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
    'GET':{
        active:true,
        roles:['manager', 'admin', 'super-admin']
    },
    'PUT':{
        active:true,
        roles:['admin', 'super-admin']
    },
    'DELETE':{
        active:true,
        roles:['super-admin']
    }
})