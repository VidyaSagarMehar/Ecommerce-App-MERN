const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { route } = require('./auth');
const { getToken, processPayment } = require('../controllers/brainTreePayment');

// get route to get token
router.get('/payment/gettoken/:userId', isSignedIn, isAuthenticated, getToken);
// post route
router.post(
	'/payment/braintree/:userId',
	isSignedIn,
	isAuthenticated,
	processPayment,
);

module.exports = router;
