const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: 'useYourMerchantId',
	publicKey: 'useYourPublicKey',
	privateKey: 'useYourPrivateKey',
});

// getting token method
exports.getToken = () => {
	gateway.clientToken.generate({}, (err, response) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(response);
		}
	});
};

// process the payment method and get nonce from the client method
exports.processPayment = () => {
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
				res.status(500).json(err);
			} else {
				res.json(result);
			}
		},
	);
};
