import dbConnect from "../../../../lib/dbConnect";
import authenticated from "../../../../middlewares/authenticated";
import Order from '../../../../models/Order';

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try{
                const {orderId} = req.query;
                const order = await Order.findById(orderId)
                if(!order) throw new Error("Not Found");
                res.status(200).json({ success: true, data: order })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'PUT':
            try{
                const {orderId} = req.query;
                const order = await Order.findById(orderId)
                if(!order) throw new Error("Not Found");
                const data = req.body;
                if(data.mobile != undefined) order.mobile = data.mobile;
                if(data.deliveryCharge != undefined) order.deliveryCharge = data.deliveryCharge;
                if(data.discount != undefined) order.discount = data.discount;
                if(data.additionalCharges != undefined) order.additionalCharges = data.additionalCharges;
                if(data.status != undefined) order.status = data.status;
                await order.save()
                res.status(200).json({ success: true, data: order })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'DELETE':
            try{
                const {orderId} = req.query;
                await Order.deleteOne({_id:orderId})
                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(401).json({ success: false })
            break
    }
}

export default authenticated(handler,{
    'PUT':{
        active:true,
        roles:['manager', 'admin', 'super-admin']
    },
    'DELETE':{
        active:true,
        roles:['super-admin']
    }
})