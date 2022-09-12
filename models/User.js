import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    mobile: {
        type:String,
        unique:true,
        required:true
    },
    password: String,
    otp: Number,
    role: {
        type:String,
        enum:["customer", "manager", "admin", "super-admin"],
        default:"customer"
    },
    verified: {
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)