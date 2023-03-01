const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, cate) => {
		// check for error
		if (err) {
			return req.status(400).json({
				error: 'Category not found in DB',
			});
		}
		// if no error
		req.category = cate;
		next();
	});
};
