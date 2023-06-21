import mongoose from "mongoose";

const Post = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    caption:{type:String},
    image:{type:String}
},
{collection:'posts'}
) 

const model = mongoose.model('Post',Post);

export default model;