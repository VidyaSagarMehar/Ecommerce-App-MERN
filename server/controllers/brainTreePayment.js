const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: '39v8s3x8rn4zxss5',
	publicKey: 'jqnpb6p74krqvs4p',
	privateKey: '18f814fd6ddb9f08aa8ec75cba6d674e',
});

// getting token method
exports.getToken = (req, res) => {
	gateway.clientToken.generate({}, function (err, response) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(response);
		}
	});
};

// process the payment method and get nonce from the client method
exports.processPayment = (req, res) => {
	let nonceFromTheClient = req.body.paymentMethodNonce;

	let amountFromTheClient = req.body.amount;
	gateway.transaction.sale(
		{
			amount: amountFromTheClient,
			paymentMethodNonce: nonceFromTheClient,
			options: {
				submitForSettlement: true,
			},
		},
		(err, result) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(result);
			}
		},
	);
};
