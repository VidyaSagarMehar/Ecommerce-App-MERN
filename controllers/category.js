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

exports.createCategory = (req, res) => {
	const category = new Category(req.body);
	category.save((err, category) => {
		// check for error
		if (err) {
			return req.status(400).json({
				error: 'Category creation failed',
			});
		}
		// if no error
		res.json({ category });
	});
};
