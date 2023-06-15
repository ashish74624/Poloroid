import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from './models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from "multer";
import bodyParser from 'body-parser';



const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.URL);  
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


  app.post('/register', upload.single('profileImage'), async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const { filename, path } = req.file;
  
    try {
      const newPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: newPassword, // Use the correct field name for the hashed password
        profileImage: {
          filename,
          path,
        },
      });
      await newUser.save();
      res.json({ status: 'ok' });
    } catch (err) {
      res.json({ status: 'error', error: err });
    }
  });

app.post('/login', async (req, res) => {
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
              lastName: user.lastName
            },
            'secretpassword'
          );
          res.json({ status: 'ok', user: token });
        } else {
          res.json({ status: 'error', error: 'Invalid Login' });
        }
      }
    } catch (err) {
      res.json({ status: 'error', error: err.message });
    }
  });
  

app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
})

 