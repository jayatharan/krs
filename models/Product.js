import mongoose, { Schema } from 'mongoose'

const DiscountSchema = new Schema({
    value:{
        type:Number,
        default:0.00
    },
    type:{
        type:String,
        enum:["no","per","amt"],
        default:"no"
    }
})

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    size:String,
    description:String,
    image:String,
    available:{
        type:Boolean,
        default:true
    },
    originalPrice:{
        type:Number,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory',
        required:false
    },
    sales:{
        type:Number,
        default:0
    },
    discount:{
        type: DiscountSchema,
        default:{}
    }
},{
    timestamps:true
})

ProductSchema.virtual('price').get(function(){
    let price = this.originalPrice;
    if(this.discount && this.discount.type != 'no'){
        if(this.discount.type == 'amt') price = this.originalPrice - this.discount.value
        else if(this.discount.type == 'per') price = this.originalPrice*(100-this.discount.value)/100
    }
    return price;
})

ProductSchema.set('toJSON', {
    virtuals: true
})

ProductSchema.set('toObject' , {
    virtuals: true
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)