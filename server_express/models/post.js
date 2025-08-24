import mongoose from "mongoose";

const Post = new mongoose.Schema({
    firstName :{type: String },
    lastName :{type: String},
    email :{type:String,require:true},
    userProfile:{type:String},
    friends: { type: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }], default: [] },
    caption:{type:String},
    image:{type:String},
    likes:{type:Number,default:0},
    likedBy : { type: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }], default: [] } 
},
{collection:'posts'}); 

// Define a pre-save hook
Post.pre('save', function(next) {
    if (this.likes < 0) {
      // If likes is less than zero, set it to zero
      this.likes = 0;
    }
    next();
  });
  

const model = mongoose.model('Post',Post);

export default model;