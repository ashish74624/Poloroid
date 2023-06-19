import mongoose from "mongoose";

const Post = mongoose.Schema({
    firstName :{type: String },
    lastName :{type: String},
    email :{type:String,require:true},
    caption:{type:String},
    image:{type:String}
},
{collection:'posts'}
) 

const model = mongoose.model('Post',Post);

export default model;