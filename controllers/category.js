const Category = require('../models/category');

// controller to find category by id and export it to populate
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

// controller to create category
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

// controller to get category
exports.getCategory = (req, res) => {
	return res.json(req.category); //grab category from the parameter
};

// controller to get all categories
exports.getAllCategory = (req, res) => {
	Category.find().exec((err, categories) => {
		// check for error
		if (err) {
			return req.status(400).json({
				error: 'No category found',
			});
		}
		// if no error
		res.json(categories);
	});
};

//  controller to update category
exports.updateCategory = (req, res) => {
	const category = req.category; //grab category from the parameter
	category.name = req.body.name; //grab category from client

	category.save((err, updatedCategory) => {
		// check for error
		if (err) {
			return req.status(400).json({
				error: 'Failed to update categoory',
			});
		}
		// if no error
		res.json(updatedCategory);
	});
};

//  controller to update category
exports.deleteCategory = (req, res) => {
	const category = req.category; //grab category from the parameter
	category.remove((err, category) => {
		// check for error
		if (err) {
			return req.status(400).json({
				error: `Failed to delete the ${category}`,
			});
		}
		// if no error
		res.json({
			message: `Successfully deleted ${category}`,
		});
	});
};
