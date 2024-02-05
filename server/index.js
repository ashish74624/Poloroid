import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import multer from "multer";
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import userRoutes from './routes/userRoute.js';
import postRoutes from './routes/postRoute.js';
import socialRoutes from './routes/socialRoute.js';

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

app.use('/user',userRoutes);
app.use('/post',postRoutes);
app.use('/social',socialRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
});