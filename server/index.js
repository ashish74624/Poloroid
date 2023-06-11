import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from './models/user.js'




const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URL);
app.post('/register',async(req,res)=>{
    console.log(req.body);
    try{

        const newPassword = await bcrypt.hash(req.body.password)
        await User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password: newPassword
        })
        res.json({status:"ok"});
    }
    catch(err){
        res.json({status:"error", error:err});
    }
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    try{
        const user = User.findOne(
            {email : req.body.email}
        )

        if(!user){
            res.json({status: "error" , error:"Invalid Login"})
        }
        
        const isOk = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if(isOk){
            const token =  jwt.sign({
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
            },'secretpassword');
            res.json({ status: 'ok', user: token })
        }

    }
    catch(err){
        res.json({status:"error",user:false })
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
})

 