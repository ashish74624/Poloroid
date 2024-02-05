import express from 'express'
import { addSocial, getSocial } from '../controllers/socialController.js';

const router = express.Router();

router.put('/social/:email',addSocial);
router.get('/getSocials/:email',getSocial);

export default router;