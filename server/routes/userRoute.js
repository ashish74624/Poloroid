import express from 'express'
import { 
    addFriend,
    getData,
    getFriendSuggestions,
    getFriends,
    login,
    notifications,
    register,
    rejectRequest,
    removeSuggestion,
    sendNotifiaction
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/data/:email',getData);
router.put('/sendNotifiaction/:id',sendNotifiaction);
router.get('/getFriendSuggestions/:email',getFriendSuggestions)
router.get('/notifications/:email',notifications);
router.put('/addFriend/:email',addFriend);
router.put('/removeSuggestion/:id',removeSuggestion);
router.put('/rejectRequest/:id',rejectRequest);
router.get('/friends/:email',getFriends);

export default router;