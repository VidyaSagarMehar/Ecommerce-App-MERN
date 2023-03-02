const express = require('express');
const router = express.Router();
const {
	getCategoryById,
	createCategory,
	getCategory,
	getAllCategory,
	updateCategory,
} = require('../controllers/category');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// populate using params
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

// actual routes goes here
// create route
router.post(
	'/category/create/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createCategory,
);
// read route
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory);
// update route
router.put(
	'/category/:categoryId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateCategory,
);

// delete route

module.exports = router;
