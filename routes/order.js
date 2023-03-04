const express = require('express');
const router = express.Router();
const { updateStock } = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { getOrderById } = require('../controllers/order');

// params to populate
router.param('userId', getUserById);
router.param('userId', getOrderById);

module.exports = router;
