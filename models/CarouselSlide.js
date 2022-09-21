import mongoose from 'mongoose';

const CarouselSlideSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    redirectTo:{
        type:String
    },
    showIn:{
        type:[String],
        default:[]
    },
    active:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

module.exports = mongoose.models.CarouselSlide || mongoose.model('CarouselSlide', CarouselSlideSchema)