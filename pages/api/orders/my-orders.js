import dbConnect from '../../../lib/dbConnect'
import authenticated from '../../../middlewares/authenticated';
import Order from '../../../models/Order'

async function handler(req, res){
    const { method } = req

    await dbConnect()

    switch(method) {
        case 'GET':
            try{
                const {page = 1, limit = 100, status} = req.query;
                const mobile = req.user.mobile;
                const filter = {mobile}
                if(status != undefined){
                    filter['status'] = status;
                }
                const p = Number.parseInt(page)
                const l = Number.parseInt(limit)
                const orders = await Order.find({$and:[
                    {filter},
                    {status:{$ne:'in-cart'}}
                ]}).limit(l).skip((p-1)*l).sort({'createdAt': -1})
                res.status(200).json({ success: true, data: orders})
            } catch (error) {
                res.status(400).json({ success: true, error })
            }
            break
        default:
            res.status(401).json({ success: false })
            break
    }
}

export default authenticated(handler,{
    'GET':{
        active:true,
        roles:[]
    }
})