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

// get all orders controller
exports.getAllOrders = (req, res) => {
	Order.find()
		.populate('user', '_id name')
		.exec((err, orders) => {
			// check for error
			if (err) {
				return req.status(400).json({
					error: 'No orders found in DB',
				});
			}
			// if no error
			res.json(orders);
		});
};
// get order status controller
exports.getOrderStatus = (req, res) => {
	res.json(Order.schema.path('status').enumValues);
};

// update order controller
exports.updateStatus = (req, res) => {
	Order.update(
		{
			_id: req.body.orderId,
		},
		{ $set: { status: req.body.status } },
		(err, order) => {
			// check for error
			if (err) {
				return req.status(400).json({
					error: 'Cannot update order status',
				});
			}
			// if no error
			res.json(order);
		},
	);
};
