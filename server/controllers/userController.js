import User from "../models/user.js";
import Post from '../models/post.js';
import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary';

export const register=async(req,res)=>{
     try {
      if(req.body.file){
        let user = await User.findOne({email:req.body.email});
      if(user){
        return res.json({status: 'error', msg:'Email already exists'});
      }
      const newPassword = await bcrypt.hash(req.body.password, 10);
      const result = await cloudinary.uploader.upload(req.body.file);
      const newUser = await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password: newPassword, // Use the correct field name for the hashed password
        place: req.body.place,
        profileImage: result.public_id
      }); 
      await newUser.save();   
      }
      else{
        let user = await User.findOne({email:req.body.email});
      if(user){
        return res.json({status: 'error', msg:'Email already exists'});
      }
      const newPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password: newPassword, // Use the correct field name for the hashed password
        place: req.body.place,
        profileImage: "i07kehkwnznydwl17iil.webp"
      }); 
      await newUser.save();   
      }
      return res.json({ status: 'ok' });
    } catch (err) {  
      return res.json({ status: 'error', error: err });
    }   
}

export const login = async(req,res)=>{
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.json({ status: 'error', msg: 'Invalid email or password' });
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          const userWithoutPassword = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.profileImage,
          };
          res.json({ status: 'ok', user: userWithoutPassword });
        } else {
          res.json({ status: 'error', msg: 'Invalid email or password' });
        }
      }
    } catch (err) {
      res.json({ status: 'error', error: err.message });
    }
}

export const getData = async(req,res)=>{
    const email = req.params.email;
    try{
      let user=await User.findOne({email: email});
      return res.json(user);
    }catch(err){
      console.log("Coudn't fetch User data");
    }

}

export const sendNotifiaction=async(req,res)=>{
    const id = req.params.id;
    const email1= req.body.emailOfUser
    let email= email1.replace('%40','@')
    try{
      const user = await User.findOne({email:email});
      const friend = await User.findOneAndUpdate(
        {_id: id},
        {$push:
          {notifications:
            {sender:
              {
                id:user._id,
                name:user.firstName,
                profilePicture: user.profileImage
              }
            }
          }
        },
        {new:true}// This ensures that the updated user document is returned in the user variable.
        );
        const updateUser= await User.findOneAndUpdate(
          {email:req.body.emailOfUser},
          {$push:
            {request:
              {
                sentTo:{
                  id: friend._id
                }
              }
          }
          },
          {new:true}
        );
      return res.json({status:"ok", msg:"Notifiaction sent sucessfully"}) ; 
    }catch(err){
      console.log("Error in sending notification")
      return res.json({status:"error", msg : "Error in sending notification"});
    }
}

export const getFriendSuggestions=async(req,res)=>{
        const email = req.params.email;
    try{
      const user = await User.findOne({email:email});
    //   const place = user.place.trim(); // Trim spaces from the place variable
    // const regexPattern = new RegExp(`.*\\b${place}\\b.*`, 'i');
      const friends = await User.find({ email: { $ne: email }, 
      'notifications.sender.id':{$ne : user._id}, //This line ensures that the friends I have already requested are not retured again by using $ne
      'request.sentTo.id':{$ne : user._id},
      'friends.id':{$ne:user._id},
      'rejectedBy.id':{$ne:user._id}
    }); // $ne--not equal: ensures that the user with email or userId same as the one provided will not be retured 
      res.json(friends)
    }catch(err){
      console.log('Error suggesting friends');
    }
}

export const notifications= async(req,res)=>{
    const email = req.params.email;
    try{
      const user = await User.findOne({email: email});
      const notification = user.notifications
      return res.json({status:'ok', msg:notification})
    }catch(err){
      return res.json({status:'not ok', msg:false});
    }
} 

export const addFriend = async(req,res)=>{
    const email = req.params.email;
    try{
      let friendID= req.body.friendID;
      console.log(friendID)
      const user1 =  await User.findOne({email:email});
      const user = await User.findOneAndUpdate({email:email},
        {
          $push:{
          friends:{
            id:friendID
          }},
          
          $pull:{
          notifications:{
            'sender.id': friendID
          }
        }},
        {new:true}
        ); 
      const friend = await User.findOneAndUpdate({_id:friendID},
        { $push: { friends: { id: user1._id } } ,
        $pull:{
          request:{'sentTo.id':user1._id}
        }},
        {new:true}
      );

      const posts = await Post.findOneAndUpdate({email:email},
        { $push: { friends: { id: friendID } } },
        {new:true}
      )

      const friendsPost = await Post.findOneAndUpdate({email:friend.email},
        { $push: { friends: { id: user1._id } } },
        {new:true}
      )  


      res.json({status:'ok',msg:'Friend Added'})
    }
    catch(err){
      console.log("Unable to add friend request")
    }
}

export const removeSuggestion = async(req,res)=>{
    const id = req.params.id;
    const email1= req.body.email;
    let email= email1.replace('%40','@')
    try{
      const user = await User.findOne({email:email});
      const friend = await User.findOneAndUpdate({_id:id},{
        $push:{
          rejectedBy:{
            id: user._id
          }
        }
        },
        {new:true}
      );
      res.status(200).json({msg:"Removed suggestion"})
  }catch(err){
    console.log("Unable to remove suggestion")
  }
}

export const rejectRequest = async(req,res)=>{
        let id = req.params.id;
    let email1 = req.body.email;
    let email= email1.replace('%40','@')
    try{
      const user = await User.findOneAndUpdate({email:email},{
        $pull:{
          notifications:{
            'sender.id':id // This is how pull works
          }
        }
        },
        {new:true}
        )

      const friend = await User.findOneAndUpdate({_id:id},{
        $push:{
          rejectedBy:{
            id:user._id
          }
        },
        $pull:{
          request:{
            'sentTo.id':user._id
          }
        }
        },
        {new:true}
        )
    return res.status(200).json({msg:"Request Rejected"})
    }
    catch(err){
      console.log("Unable to reject request")
    }  
}

export const getFriends=async(req,res)=>{
    const email=req.params.email;
    try{
      const user =await User.findOne({email:email}).populate('friends.id') //What populate does is that it gets all the data of the users in friends array using thier id's (that's why we have ref:'User' in thier schema fields)
      if(user.friends.length>0){
        //In th below code user.friends array is already populated with all thier details
        const friendsDetails = user.friends.map((friend)=>{
          return{
            firstName: friend.id.firstName,
            lastName: friend.id.lastName,
            email: friend.id.email,
            profileImage: friend.id.profileImage
          }
        })
        res.status(200).json({msg:"friends Found",friends:friendsDetails});
      }
      else{
        res.status(200).json({msg:"Nofriends"});
      }


    }catch(err){
      console.log('Friends not found');
    } 
}


export default {
    register,
    login,
    rejectRequest,
    removeSuggestion,
    addFriend,
    notifications,
    getFriendSuggestions,
    sendNotifiaction,
    getData,
    getFriends
}