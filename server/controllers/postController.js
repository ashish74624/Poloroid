import User from "../models/user.js";
import Post from '../models/post.js';
import { v2 as cloudinary } from 'cloudinary';

export const post=async(req,res)=>{
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
}

export const likePost = async(req,res)=>{
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
}

export const allPost = async(req,res)=>{
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
      console.log('All post not done')
    }
}


export const personalPosts= async(req,res)=>{
    const email= req.params.email;
    try{
      const post = await Post.find({email:email});
      return res.status(200).json(post);
    }
    catch{
      return res.status(400).json("Not found")
    }
}

export const upload =async(req,res)=>{
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
}

export const getImages=async(req,res)=>{
    try {
      const email  = req.params.email;
  
      const posts = await Post.find({ email: email }); 

      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve images' });
    }
}


export default {
    getImages,
    upload,
    personalPosts,
    allPost,
    likePost,
    post
}