const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { updateStock } = require('../controllers/product');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { getOrderById, createOrder } = require('../controllers/order');

// params to populate
router.param('userId', getUserById);
router.param('userId', getOrderById);

// actual routes goes here
// create order route
router.post(
	'/order/create/:userId',
	isSignedIn,
	isAuthenticated,
	pushOrderInPurchaseList,
	updateStock,
	createOrder,
);

module.exports = router;
