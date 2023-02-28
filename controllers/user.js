const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec(() => {
		if (err || !user) {
			return res.status(400).json({
				error: 'No user was found in DB',
			});
		}
		req.profile = user;
		next();
	});
};

exports.getUser = (req, res) => {
	// TODO: for password
	return res.json(req.profile);
};
