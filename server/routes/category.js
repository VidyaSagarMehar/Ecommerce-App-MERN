const express = require('express');
const router = express.Router();
const {
	getCategoryById,
	createCategory,
	getCategory,
	getAllCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/category');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// populate using params
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

// actual routes goes here
// create category route
router.post(
	'/category/create/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createCategory,
);
// read category route
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory);
// update category route
router.put(
	'/category/:categoryId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateCategory,
);
// delete category route
router.delete(
	'/category/:categoryId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	deleteCategory,
);

module.exports = router;
