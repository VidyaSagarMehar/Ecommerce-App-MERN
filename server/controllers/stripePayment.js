const stripe = require('stripe')(
	'sk_test_51Mly4CSFWhgOaplCTTrIjaJE4hnZZlG3MsKFXlFs9rYNLYTGSeUQEbVSgfnomcDlmxieEuoSvwOLk8gZsCZgwFed00oEKOXiYM',
);
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
					amount: amount * 100,
					currency: 'usd',
					customer: customer.id,
					receipt_email: token.email,
					description: 'a test account',
					shipping: {
						name: token.card.name,
						address: {
							line1: token.card.address_line1,
							line2: token.card.address_line2,
							city: token.card.address_city,
							country: token.card.address_country,
							postal_code: token.card.address_zip,
						},
					},
				},
				{ idempotencyKey },
			);
		})
		.then((result) => res.status(200).json(result))
		.catch((err) => console.log(err));
};
