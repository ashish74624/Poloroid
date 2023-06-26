import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from './models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from "multer";
import bodyParser from 'body-parser';
import Post from './models/post.js'
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

const app = express();

app.use(fileUpload());

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});



dotenv.config();
app.use(cors());
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

  app.post('/upload' , async(req,res)=>{
    try {
      if (!req.body.image) {
        return res.status(400).json({ error: 'No image data provided' });
      }
  
      const result = await cloudinary.uploader.upload(req.body.image);
  
      const newPost = new Post({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email, 
        caption: req.body.caption,
        image: result.public_id,
      });
  
      await newPost.save();
  
      res.json({ status:'ok', public_id: result.public_id, url: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Image upload failed' });
    }
  });


  app.get('/getImages/:email', async (req, res) => {
    try {
      const { email } = req.params;
  
      const posts = await Post.find({ email: email }); 
  
      const images = posts.map(post => ({ 
        public_id: post.image,
        url: `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/${post.image}`
      }));
  
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve images' });
    }
  });
  

  app.post('/register', async (req, res) => {
    // console.log(req.body)
    try {
      const newPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password: newPassword, // Use the correct field name for the hashed password
        profileImage: req.body.file
      }); 
      await newUser.save();   
      return res.json({ status: 'ok' });
    } catch (err) {  
      return res.json({ status: 'error', error: err });
    }   
  });
  
  app.post('/login', async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.json({ status: 'error', error: 'Invalid Login' });
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
          const token = jwt.sign(
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              profileImage: user.profileImage,
            },
            'secretpassword'
          );
          const userWithoutPassword = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.profileImage,
          };
          res.json({ status: 'ok', user: userWithoutPassword });
        } else {
          res.json({ status: 'error', error: 'Invalid Login' });
        }
      }
    } catch (err) {
      res.json({ status: 'error', error: err.message });
    }
  });
  
  app.post('/post', async(req,res)=>{
    // console.log(req.body);
    try{
      // console.log(req.body.firstName)
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


  
  app.get('/posts/:email', async(req,res)=>{

    const {email} = req.params;
    try{
      const posts = await Post.find({email})
      // console.log(posts)
      res.json(posts);
    }catch(err){
      console.log("Error");
    }
  })     

  app.get('/postsData/:email', async(req,res)=>{

    const {email} = req.params;
    try{
      const posts = await Post.find({email}).select('-image')
      // console.log(posts)
      res.json(posts);
    }catch(err){
      console.log("Error");
    }
  })  


  app.put('/like/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const p = await Post.findOne({ _id: id });
  
      if (!p.isLiked) {
        const post = await Post.findOneAndUpdate(
          { _id: id },
          { $inc: { like: 1 }, $set: { isLiked: true } },
          { new: true }
        );
  
        if (!post) {
          return res.json({ status: 'error', msg: 'Post not found' });
        }
  
        return res.json({ status: 'ok', msg: 'Post liked', post });
      } else {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: id },
          { $inc: { like: -1 }, $set: { isLiked: false } },
          { new: true }
        );
  
        if (!updatedPost) {
          return res.json({ status: 'error', msg: 'Post not found' });
        }
  
        return res.json({ status: 'ok', msg: 'Post disliked', post: updatedPost });
      }
    } catch (error) {
      console.log(error);
      return res.json({ status: 'error', msg: 'An error occurred' });
    }
  });
  
  


app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
})

 