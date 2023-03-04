const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { updateStock } = require('../controllers/product');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const {
	getOrderById,
	createOrder,
	getAllOrders,
	updateStatus,
	getOrderStatus,
} = require('../controllers/order');

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

// get all orders route
router.get(
	'/order/all/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getAllOrders,
);

// order status route
router.get(
	'/order/status/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getOrderStatus,
);

// update order route
router.put(
	'/order/:orderId/status/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateStatus,
);

module.exports = router;
