import mongoose, { Schema } from 'mongoose'

const CartItemSchema = new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    name:{
        type:String
    },
    description:String,
    image:String,
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
},{
    timestamps:true
})

const AdditionalChargeSchema = new Schema({
    reason:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        default:0
    }
})

const OrderSchema = new Schema({
    cartItems:{
        type:[CartItemSchema],
        default:[]
    },
    mobile:String,
    deliveryCharge:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    },
    additionalCharges:{
        type:[AdditionalChargeSchema],
        default:[]
    },
    status: {
        type:String,
        enum:["in-cart", "waiting", "confirmed", "process", "in-delivery", "delivered", "confirmed", "cancelled"],
        default:"in-cart"
    }
},{
    timestamps:true
})

CartItemSchema.virtual('subTotal').get(function(){
    return (this.price * this.quantity);
})

CartItemSchema.set('toJSON', {
    virtuals: true
})

CartItemSchema.set('toObject' , {
    virtuals: true
})

OrderSchema.virtual('cartTotal').get(function (){
    let total = 0;
    this.cartItems.map((i)=>{
        total+=i.subTotal
    })
    return total;
})

OrderSchema.virtual('total').get(function (){
    let total = this.cartTotal;
    total += this.deliveryCharge;
    total -= this.discount;
    this.additionalCharges.map((c)=>{
        total+=c.amount
    })
    return total;
})

OrderSchema.set('toJSON', {
    virtuals: true
})

OrderSchema.set('toObject' , {
    virtuals: true
})

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema)