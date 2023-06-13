import express from 'express'
import User from './models/user.js'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const router = express.Router();


router.post('/register',async(req,res)=>{
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

export default router;
