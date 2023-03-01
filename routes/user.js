const express = require('express');
const router = express.Router();
const { getUserById, getUser, getAllUsers } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

// getting user as param from getUserById controller
router.param('userId', getUserById);
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.get('/users', getAllUsers);

module.exports = router;
