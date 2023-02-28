const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
	// throw custom errors using exoress validator
	// checking for errors in input field
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
			Field: errors.array()[0].param,
		});
	}

	// save user if there is no error
	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				err: 'Not able to save user in DB',
			});
		}
		res.json({
			name: user.name,
			email: user.email,
			id: user._id,
		});
	});
};
exports.signin = (req, res) => {
	const errors = validationResult(req);
	const { email, password } = req.body;

	// checking for errors in input field
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
			Field: errors.array()[0].param,
		});
	}

	User.findOne({ email }, (err, user) => {
		// Throw error if email does not exists
		if (err || !user) {
			return res.status(400).json({
				error: 'User email does not exists',
			});
		}
		// If authentication failed
		if (!user.autheticate(password)) {
			return res.status(401).json({
				error: 'Email and password do not match',
			});
		}
		// If everything is fine
		// Create token
		const token = jwt.sign({ _id: user._id }, process.env.SECRET);

		// Put token in cookie
		res.cookie('token', token, { expire: new Date() + 9999 });

		// Send response to front end
		const { _id, name, email, role } = user;
		return res.json({
			token,
			user: { _id, name, email, role },
		});
	});
};

exports.signout = (req, res) => {
	res.json({
		message: 'User signout successfully',
	});
};
