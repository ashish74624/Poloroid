import express from 'express'
import User from './models/user.js'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/login', async (req, res) => {
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

export default router;