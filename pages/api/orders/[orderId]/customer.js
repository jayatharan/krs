import dbConnect from "../../../../lib/dbConnect";
import authenticated from "../../../../middlewares/authenticated";
import Order from '../../../../models/Order';

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'PUT':
            try{
                const {orderId} = req.query;
                const order = await Order.findById(orderId)
                if(!order) throw new Error("Not Found");
                const data = req.body;
                if(req.user){
                    order.mobile = req.user.mobile;
                }
                if(data.mobile != undefined && data.mobile) order.mobile = data.mobile;
                else{
                    throw new Error("Not Found");
                }
                if(data.status != undefined && ['waiting', 'cancelled'].includes(data.status) && ['in-cart', 'waiting'].includes(order.status)) order.status = data.status;
                else{
                    throw new Error("Not Found");
                }
                await order.save()
                res.status(200).json({ success: true, data: order })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(401).json({ success: false })
            break
    }
}

export default authenticated(handler,{})