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
