import dbConnect from "../../../../../lib/dbConnect";
import authenticated from "../../../../../middlewares/authenticated";
import Order from '../../../../../models/Order'
import Product from '../../../../../models/Product'

async function handler(req,res){
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            try{
                const {orderId} = req.query;
                const order = await Order.findById(orderId);
                if(!order) throw new Error("Not Found");
                if(req.user){
                    order.mobile = req.user.mobile;
                }
                const data = req.body;
                const cartItems = order.cartItems;
                if(data.productId){
                    const product = await Product.findById(data.productId);
                    if(!product) throw new Error("Not Found")
                    const idx = cartItems.findIndex((i)=>{
                        if(i.productId == data.productId) return true;
                        else return false;
                    })
                    if(data.name == undefined) data.name = product.name
                    if(data.description == undefined) data.description = product.description
                    if(data.image == undefined) data.image = product.image
                    if(data.price == undefined) data.price = product.price
                    if(idx>-1){
                        if(data.quantity>0)order.cartItems[idx] = {...order.cartItems[idx], ...data}
                        else order.cartItems.splice(idx, 1);
                    }else{
                        if(data.quantity>0) order.cartItems.push({...product,...data});
                    }
                }else{
                    if(data.name){
                        const idx = cartItems.findIndex((i)=>{
                            if(!i.productId && i.name == data.name) return true;
                            else return false;
                        })
                        if(idx >-1){
                            if(data.quantity>0) order.cartItems[idx] = {...order.cartItems[idx], ...data}
                            else order.cartItems.splice(idx, 1);
                        }else{
                            if(data.quantity>0) order.cartItems.push(data);
                        }
                    }else{
                        res.status(400).json({ success: true, message:'Product name is required'})
                        break
                    }
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

export default authenticated(handler, {

})