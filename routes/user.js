const express = require('express');
const router = express.Router();
const {
	getUserById,
	getUser,
	getAllUsers,
	updateUser,
} = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

// getting user as param from getUserById controller and store the user id in userId
router.param('userId', getUserById);
// user routes
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.get('/users', getAllUsers);
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);

module.exports = router;
