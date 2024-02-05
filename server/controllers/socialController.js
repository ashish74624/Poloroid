import Social from "../models/social.js";

export const addSocial=async(req,res)=>{
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
}

export const getSocial = async(req,res)=>{
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
}

export default {
    getSocial,
    addSocial
}