import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from './models/user.js'
import Post from './models/post.js'
import Social from "./models/social.js";
import bcrypt from 'bcryptjs';
import multer from "multer";
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

const app = express();

app.use(fileUpload());


dotenv.config();
app.use(cors({
  origin: ['https://poloroid.vercel.app',"http://localhost:3000","https://poloroid-ashish74624.vercel.app"],
  methods :['GET','PUT','POST'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET
});

mongoose.connect(process.env.URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});
const db = mongoose.connection

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });
  
  const upload = multer({ storage: storage });

  app.get('/',async(req,res)=>{
    res.json("Hello There !")
  })

  app.post('/upload' , async(req,res)=>{
    try {
      if (!req.body.image) {
        return res.status(400).json({ error: 'No image data provided' });
      }
  
      const result = await cloudinary.uploader.upload(req.body.image);
      const user = await User.findOne({email:req.body.email});
      const newPost = new Post({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email, 
        userProfile: user.profileImage,
        place: user.place,
        caption: req.body.caption,
        image: result.public_id,
      });
  
      await newPost.save();
  
      res.json({ status:'ok' });
    } catch (error) {
      console.error(error);
      res.json({ error: 'Image upload failed' });
    }
  });


  app.get('/getImages/:email', async (req, res) => {
    try {
      const email  = req.params.email;
  
      const posts = await Post.find({ email: email }); 

      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve images' });
    }
  });
  
  app.post('/register', async (req, res) => {
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
  });
  
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.json({ status: 'error', msg: 'Invalid EmailId' });
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
          res.json({ status: 'error', msg: 'Invalid Password' });
        }
      }
    } catch (err) {
      res.json({ status: 'error', error: err.message });
    }
  });

  app.get('/data/:email' , async(req,res)=>{
    const email = req.params.email;
    try{
      let user=await User.findOne({email: email});
      return res.json(user);
    }catch(err){
      console.log("Coudn't fetch User data");
    }

  })
  
  app.post('/post', async(req,res)=>{
    try{
      const post = await Post.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        caption: req.body.caption,
        image: req.body.file, 
      })
      await post.save()
      return res.json({ status: 'ok' });
    }
    catch (err) {  
      console.log("error while uploading")
      return res.json({ status: 'error', error: err });
    } 
  })


  
  app.put('/like/:id', async (req, res) => {
    let postId = req.params.id;
    const email1 = req.body.emailOfUser;
    let email= email1.replace('%40','@')
    try {
      const user = await User.findOne({ email: email });
      const post = await Post.findOne({ _id: postId });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const isLiked = post.likedBy.some((likedUser) => likedUser.id.equals(user._id));//.some() is a JavaScript array method that tests whether at least one element in the array satisfies the provided callback function --- iterates over each element of the array until it finds an element that satisfies the callback function-- returns true or false
  
      if (isLiked) {
        post.likes -= 1;
        post.likedBy = post.likedBy.filter((likedUser) => !likedUser.id.equals(user._id));//.filter() applies to each element of the and filters out the elements that pass the condition provided in the call back function (which it takes as an arg)-- in this case we check if likedBy has the user._id in it and we use ! to remove it

        //  ALSO: .filter() does not change the original array it creates a new array
        // In this case that new array created by the .filter() replaces the old one
        await post.save();
        res.status(200).json({msg:'disliked',post:post});
      } else {
        post.likes += 1;
        post.likedBy.push({ id: user._id });
        await post.save();
        res.status(200).json({msg:'liked',post:post});
      }
  
  
      
    } catch (err) {
      console.error("Error Liking post");
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  



  app.put('/sendNotifiaction/:id', async(req,res)=>{
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
  })

  app.get('/getFriendSuggestions/:email', async(req,res)=>{
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
  })

  app.get('/notifications/:email', async(req,res)=>{
    const email = req.params.email;
    try{
      const user = await User.findOne({email: email});
      const notification = user.notifications
      return res.json({status:'ok', msg:notification})
    }catch(err){
      return res.json({status:'not ok', msg:false});
    }
  })


  app.put('/addFriend/:email',async(req,res)=>{
    const email = req.params.email;
    try{
      let friendID= req.body.friendID;
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
        {new:true})  
      const posts2 = await Post.findOneAndUpdate({email:friend.email},
        { $push: { friends: { id: user1._id } } },
        {new:true})  

        res.json({status:'ok',msg:'Friend Added'})
    }
    catch(err){
      console.log("Unable to add friend request")
    }
  });

  app.put('/removeSuggestion/:id', async(req,res)=>{
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
  )

  app.put('/rejectRequest/:id', async(req,res)=>{
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
  });
  
  app.get('/allPost/:email', async(req,res)=>{
    const email = req.params.email;
    email.replace('%40','@')

    try{
      const user = await User.findOne({email:email});
      const posts = await Post.find({
        $or:[
          {email:email},
        {'friends.id':user._id}
        ]
      }
      )
      if(posts.length<=0){
        const defaultPosts = await Post.find({email:'ashishkumar74624@gmail.com'});
        defaultPosts.reverse();
        return res.status(200).json(defaultPosts);
      }else{
        posts.reverse() 
        return res.status(200).json(posts);
      }
    }catch(err){
      console.log('All post nnnnnnnot done')
    }
  });

  app.get('/friends/:email', async(req,res)=>{
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
  })

  app.get('/personalPosts/:email',async(req,res)=>{
    const email= req.params.email;
    try{
      const post = await Post.find({email:email});
      return res.status(200).json(post);
    }
    catch{
      return res.status(400).json("Not found")
    }
  });

  app.put('/social/:email',async(req,res)=>{
    const email = req.params.email;
    const {instagram,linkedin,github} = req.body;
    try{
      const user = await Social.findOne({email:email}); 
      if(!user){
        user = await Social.create({email,instagram,linkedin,github});
        await user.save();
        res.status(200).json({done:true});  
      }else{
        user.instagram = instagram,
        user.linkedin = linkedin,
        user.github = github
        await user.save();
        res.status(200).json({done:true});  
      }
    }
    catch{
      res.status(400).json({done:false});  
    }
  })

  app.get('/getSocials/:email',async(req,res)=>{
    const email=req.params.email;
    try{
      const social = await Social.findOne({email});
      if(social){
        res.status(200).json({social:social,msg:"User found"});
      }else{
        res.status(404).json({msg:"User Not Available"});
      }
    }
    catch{
      res.status(400);
    }
  });


app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
});