const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); //file system

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate('category')
		.exec((err, product) => {
			// check for error
			if (err) {
				return res.status(400).json({
					error: 'Product not found',
				});
			}
			// if no error
			req.product = product;
			next();
		});
};

exports.creataProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, fields, file) => {
		// check for error
		if (err) {
			return res.status(400).json({
				error: 'Problem with image',
			});
		}
		// if no error
		// destructure the fields
		const { name, description, price, category, stock } = fields;
		// restriction on field
		if (!name || !description || !price || !category || !stock) {
			return res.status(400).json({
				error: 'All fields are required',
			});
		}
		let product = new Product(fields);

		// handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: 'file size too big!',
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}

		// save to db
		product.save((err, product) => {
			// check for error
			if (err) {
				return res.status(400).json({
					error: 'Saving tshirt in db failed',
				});
			}
			// if no error
			res.json(product);
		});
	});
};
