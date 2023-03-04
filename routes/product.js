const express = require('express');
const router = express.Router();

const {
	getProductById,
	creataProduct,
	getProduct,
	photo,
	deleteProduct,
	updateProduct,
	getAllProducts,
	getAllUniqueCategories,
} = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// params to populate
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

// router to delete product
router.delete(
	'/product/:productId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	deleteProduct,
);

// router to update product
router.put(
	'/product/:productId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateProduct,
);

// listing product route || get all product
router.get('/products', getAllProducts);

// get all the unique category route
router.get('/product/categories', getAllUniqueCategories);

module.exports = router;
