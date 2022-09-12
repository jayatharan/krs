import mongoose from 'mongoose'

const SubCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:String,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    active:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.models.SubCategory || mongoose.model('SubCategory',SubCategorySchema)