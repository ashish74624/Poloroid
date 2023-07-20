import Post from '../models/post.js'
import User from '../models/user.js'

export const createPost = async(req,res)=>{
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

export const likePost = async(req,res)=>{
    let postId = req.params.id;
    const email = req.body.emailOfUser;
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

export const getAllPost = async(req,res)=>{
    const email = req.params.email;
    try{
      const user = await User.findOne({email:email});
      const posts = await Post.find({
        $or:[
          {email:email},
        {'friends.id':user._id}
        ]
      }
      )
      posts.reverse() 
      return res.status(200).json(posts);
    }catch(err){
      console.log('All post nnnnnnnot done')
    }
}

export default {
  createPost,
  likePost,
  getAllPost,
};