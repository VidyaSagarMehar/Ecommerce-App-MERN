import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getmeToken, processPayment } from './helper/brainTreePaymentHelper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { createOrder } from './helper/orderHelper';
import DropIn from 'braintree-web-drop-in-react';

const BrainTreePament = ({
	products,
	setReload = (f) => f,
	reload = undefined,
}) => {
	// all the states
	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: '',
		instance: {},
	});

	// grabbing userId and token
	const userId = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	// method to get token
	const getToken = (userId, token) => {
		getmeToken(userId, token).then((info) => {
			// console.log('INFORMATION', info);
			// console.log(token);
			// console.log(userId);
			if (info.error) {
				setInfo({ ...info, error: info.error });
			} else {
				const clientToken = info.clientToken;
				setInfo({ clientToken });
			}
		});
	};

	// conditional rendering
	const showbtndropIn = () => {
		return (
			<div>
				{info.clientToken !== null && products.length > 0 ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={(instance) => (info.instance = instance)}
						/>
						<button className="btn btn-success btn-block" onClick={onPurchase}>
							Buy
						</button>
					</div>
				) : (
					<h3>Please Login or add somthening to cart</h3>
				)}
			</div>
		);
	};

	useEffect(() => {
		getToken(userId, token);
	}, []);

	const onPurchase = () => {
		setInfo({ loading: true });
		let nonce;
		let getNonce = info.instance.requestPaymentMethod().then((data) => {
			nonce = data.nonce;
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getAmount(),
			};
			processPayment(userId, token, paymentData)
				.then((response) => {
					setInfo({ ...info, success: response.success, loading: false });
					console.log('PAYMENT SUCESS');
					// TODO: empty the card
					// TODO: force reload
				})
				.catch((error) => {
					setInfo({ loading: false, success: false });
					console.log('PAYMENT FAILED');
				});
		});
		// .catch((err) => console.log(err));
	};

	const getAmount = () => {
		let amount = 0;
		products.map((p) => {
			amount = amount + p.price;
		});
		return amount;
	};

	return (
		<div>
			<h1>Your bill is {getAmount}</h1> {showbtndropIn()}
		</div>
	);
};

export default BrainTreePament;
