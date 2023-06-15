import mongoose from "mongoose";

const User = mongoose.Schema({
    firstName :{type: String, required: true},
    lastName :{type: String},
    email :{type:String,require:true,unique:true},
    password :{type:String,require:true},
    profileImage: {
        filename: String,
        path: String,
      },
},
{collection: 'Users'});

const model = mongoose.model('user',User);

export default model;