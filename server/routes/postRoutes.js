import express from 'express'
import {createPost,likePost,getAllPost} from '../controllers/postController.js'

const router = express.Router();

router.post('/upload',createPost);
router.put('/like/:id',likePost);
router.get('/allPost/:email',getAllPost);

export default router;