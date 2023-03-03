const express = require('express');
const router = express.Router();

const {
	getProductById,
	creataProduct,
	getProduct,
	photo,
} = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// populate using params
router.param('userId', getUserById);
router.param('productId', getProductById);

// actual routes goes here
// create product route
router.post(
	'/product/create/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	creataProduct,
);
// get a product route
router.get('/product/:productId', getProduct);
// get a product photo route
router.get('/product/photo/:productId', photo);

module.exports = router;
