import express from 'express'
import { 
    allPost,
    getImages,
    likePost,
    personalPosts,
    post,
    upload
} from '../controllers/postController.js';

const router = express.Router();

router.get('/allPost/:email',allPost)
router.get('/personalPosts/:email',personalPosts);
router.put('/like/:id',likePost);
router.post('/post',post)
router.post('/upload',upload);
router.get('/getImages/:email',getImages);

export default router;