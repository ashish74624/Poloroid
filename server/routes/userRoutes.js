import express from 'express'
import {
    registerUser,
    loginUser,
    getUserData,
    addFriend,
    rejectFriendRequest,
    getFriendSuggestions,
    removeSuggestion,
    getNotifications,
    sendNotification,
    friends
  } from '../controllers/userController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/data/:email', getUserData);
router.put('/addFriend/:email', addFriend);
router.put('/rejectRequest/:id', rejectFriendRequest);
router.get('/getFriendSuggestions/:email', getFriendSuggestions);
router.put('/removeSuggestion/:id',removeSuggestion);
router.get('/notifications/:email',getNotifications);
router.put('/sendNotification/:id',sendNotification);
router.get('/friends/:email',friends);

export default router; 