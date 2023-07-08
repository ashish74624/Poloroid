import mongoose from "mongoose";

const User = mongoose.Schema({
    firstName :{type: String, required: true},
    lastName :{type: String},
    email :{type:String,require:true,unique:true},
    password :{type:String,require:true},
    profileImage: {
        type:String
      },
    place :{type:String},
    friends: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] },
    notifications :[{
      sender : {
        id : {type: mongoose.Schema.Types.ObjectId , ref:'user'},
        name :{type:String , required:true},
        profilePicture : String
      },
      sentTo : {
        id : {type: mongoose.Schema.Types.ObjectId , ref:'user'},
      },
      default: []
    }] 
},
{collection: 'Users'});

const model = mongoose.model('user',User);

export default model;