const stripe = require('stripe')('secret_key');
const { result } = require('lodash');
const { v4: uuid } = require('uuid');

exports.makepayment = (req, res) => {
	// make payment mehtod
	// token carried a lot of info and we can extract it later
	const { products, token } = req.body;
	console.log('PRODUCTS', products);

	let amount = 0;
	products.map((p) => {
		amount = amount + p.price;
	});

	const idempotencyKey = uuid();

	// steps
	// create a cutomer -> charge the customer -> return a response back
	return stripe.customer
		.create({
			// extracting email and id from token
			email: token.email,
			source: token.id,
		})
		.then((customer) => {
			stripe.charges.create(
				{
					amount: amount,
					currency: 'usd',
					customer: customer.id,
					receipt_email: token.email,
					shipping: {
						name: token.card.name,
					},
				},
				{ idempotencyKey },
			);
		})
		.then((result) => res.status(200).json(result))
		.catch((err) => console.log(err));
};
