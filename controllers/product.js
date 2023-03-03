const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); //file system
const { sortBy } = require('lodash');

// middleware
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

// create product controller

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

// get product controller
exports.getProduct = (req, res) => {
	req.product.photo = undefined; // do not want to send the parsed photo as json
	return res.json(req.product); //grabbing product from getProductById middleware
};

// middlware
exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set('Content-Type', req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

// delete product controller
exports.deleteProduct = (req, res) => {
	let product = req.product; //grabbing product from getProductById middleware
	product.remove((err, deletedProduct) => {
		// check for error
		if (err) {
			return res.status(400).json({
				error: 'Faield to delte the product',
			});
		}
		// if no error
		res.json({
			message: 'Product deleted successfully',
			deletedProduct,
		});
	});
};

// update product controller
exports.updateProduct = (req, res) => {
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
		// update the product
		let product = req.product; //grabbing product from getProductById middleware
		product = _.extend(product, fields); // take info from the field(using formidable) and assign it to product(using lodash)

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
					error: 'Updation of product failed',
				});
			}
			// if no error
			res.json(product);
		});
	});
};

// get all products controller
exports.getAllProducts = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8; // take querry from front end or set default limit to 8
	let sortBy = req.query.sortBy ? req.query.sortBy : '_id'; // sort the product by ascending order or default will be sort by _id
	Product.find()
		.select('-photo')
		.populate('category')
		.sort([[sortBy, 'asc']])
		.limit(limit)
		.exec((err, products) => {
			// check for error
			if (err) {
				return res.status(400).json({
					error: 'No product found',
				});
			}
			// if no error
			res.json(products);
		});
};

// middlware
// to update sold and stock in product model combined
exports.updateStock = (req, res, next) => {
	let myOperations = req.body.order.product.map((prod) => {
		return {
			// operation
			updateOne: {
				filter: { _id: prod._id }, //locate the product
				update: { $inc: { stock: -prod.count, sold: +prod.count } }, // increment sold count and decrement stock count
			},
		};
	});
	// performing bulk operation
	Product.bulkWrite(myOperations, {}, (err, products) => {
		// check for error
		if (err) {
			return res.status(400).json({
				error: 'Bulk opration failed',
			});
		}
		// if no error
		// handle the opration to next() middleware
		next();
	});
};
