import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:String,
    order:{
        type:Number,
        default:99999
    },
    active:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema)