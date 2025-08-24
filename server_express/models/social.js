import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema({
    email : { type:String , required:true },
    instagram: {type:String ,default:'' },
    linkedin: {type:String , default:''},
    github:{type:String ,default:''},
})

const Social = mongoose.model('Social', SocialSchema);

export default Social;