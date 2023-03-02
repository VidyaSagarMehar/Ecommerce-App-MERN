const express = require('express');
const router = express.Router();

const { getProductById } = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// populate using params
router.param('userId', getUserById);
router.param('productId', getProductById);

// actual routes goes here
// create category route

module.exports = router;
