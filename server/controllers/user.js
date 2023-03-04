const User = require('../models/user');
const Order = require('../models/order');

// controller to get the user by Id
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

// controller to Get the user
exports.getUser = (req, res) => {
	// To not send the salt and password value at the time of getting the user as json
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	return res.json(req.profile);
};

//controller to get all the users
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

// controller to Update the user
exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id }, //finding the user
		{ $set: req.body }, // update everything that is on req.body
		{ new: true, useFindAndModify: false }, // findOneAndUpdate()
		(err, user) => {
			// if there is error
			if (err) {
				return res.status(400).json({
					error: 'Update not success !!',
				});
			}
			// if no error
			// To not send the salt and password value at the time of getting the user as json
			user.salt = undefined;
			user.encry_password = undefined;
			res.json(user);
		},
	);
};

// controller to get user purchse list
// pulling the info from the order model
exports.userPurchaseList = (req, res) => {
	Order.find({ user: req.profile._id })
		.populate('user', '_id name') //reference documents in other collections
		.exec((err, order) => {
			// check for errors
			if (err) {
				return res.status(400).json({
					error: 'No order in the acoount',
				});
			}
			// if no error, get all the orders of that user
			return res.json(order);
		});
};

exports.pushOrderInPurchaseList = (req, res, next) => {
	let purchases = [];
	req.body.order.products.forEach((product) => {
		purchases.push({
			_id: product._id,
			name: product.name,
			description: product.description,
			category: product.category,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id,
		});
	});

	// Store this in DB
	// findOneAndUpdate() will update the array whether it is empty or not
	User.findOneAndUpdate(
		{ _id: req.profile._id },
		{ $push: { purchases: purchases } }, //purchases inside user model
		{ new: true }, //send me back updated one
		(err, purchases) => {
			// check for errors
			if (err) {
				return res.status(400).json({
					error: 'Unable to save purchases list',
				});
			}
			next();
		},
	);
};
