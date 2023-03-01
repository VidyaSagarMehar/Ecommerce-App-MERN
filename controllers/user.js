const User = require('../models/user');

// getting the user by Id
exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		// if there is error
		if (err || !user) {
			return res.status(400).json({
				error: 'No user was found in DB',
			});
		}
		// if no error
		req.profile = user;
		next();
	});
};

// Getting the user
exports.getUser = (req, res) => {
	// To not send the salt and password value at the time of getting the user as json
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	return res.json(req.profile);
};

// getting all the users
exports.getAllUsers = (req, res) => {
	// if there is error
	User.find().exec((err, users) => {
		if (err || !users) {
			return res.status(400).json({
				error: 'No users found',
			});
		}
		// if no error
		res.json(users);
	});
};
