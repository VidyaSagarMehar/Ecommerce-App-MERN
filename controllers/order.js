const { ProductCart, Order } = require('../models/order');

// middleware
exports.getOrderById = (req, res, next, id) => {
	Order.findById(id)
		.populate('products.product', 'name, price')
		.exec((err, order) => {
			// check for error
			if (err) {
				return req.status(400).json({
					error: 'No order found in DB',
				});
			}
			// if no error
			req.order = order;
			next();
		});
};

// create order controller
exports.createOrder = (req, res) => {
	req.body.order.user = req.profile;
	const order = new Order(req.body.order);
	order.save((err, order) => {
		// check for error
		if (err) {
			return req.status(400).json({
				error: 'Failed to save your order in DB',
			});
		}
		// if no error
		res.json(order);
	});
};
