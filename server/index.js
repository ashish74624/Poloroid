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



const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true }));

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

  app.get('/data/:email', async(req,res)=>{
    const {email} = req.params;
    try{
      // let data = await User.findOne({ email }).select('name');
      let data = await User.findOne({ email }).select('-password');
      res.json(data);
      // console.log(data);
    }
    catch(err){
      console.log("Error in getting user details");
    }  
  })


app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
})

 