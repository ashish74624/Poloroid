import mongoose from "mongoose";

const Post = new mongoose.Schema({
    firstName :{type: String },
    lastName :{type: String},
    email :{type:String,require:true},
    userProfile:{type:String},
    friends: { type: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }], default: [] },
    caption:{type:String},
    image:{type:String},
    like:{type:Number,default:0},
    isLiked:{type:Boolean,default:false}
},
{collection:'posts'}
) 

const model = mongoose.model('Post',Post);

export default model;