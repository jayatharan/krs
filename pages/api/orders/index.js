import dbConnect from '../../../lib/dbConnect'
import authenticated from '../../../middlewares/authenticated';
import Order from '../../../models/Order'

async function handler(req, res){
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try{
                const {search ,status, page = 1, limit = 100} = req.query;
                let filter = {};
                if(status){
                    filter = {status}
                }
                if(search){
                    filter = {mobile:{$regex:search, $options:'si'}}
                }
                const p = Number.parseInt(page)
                const l = Number.parseInt(limit)
                const orders = await Order.find(filter).limit(l).skip((p-1)*l).sort({'createdAt': -1})
                res.status(200).json({ success: true, data: orders})
            } catch (error) {
                res.status(400).json({ success: true, error })
            }
            break
        case 'POST':
            try{
                const {orderId} = req.body;
                let order = null;
                if(orderId){
                    order = await Order.findById(orderId);
                }
                if(!order || (order && order.status != 'in-cart')){
                    order = await Order.create({});
                }
                if(req.user){
                    order.mobile = req.user.mobile;
                }
                await order.save();
                res.status(200).json({ success: true, data: order })
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
        roles:['manager', 'admin', 'super-admin']
    }
})