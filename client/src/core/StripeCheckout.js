import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';

const StripeCheckout = ({
	products,
	setReload = (f) => f,
	reload = undefined,
}) => {
	// All the states
	const [data, setData] = useState({
		loading: false,
		success: false,
		error: '',
		address: '',
	});

	// grabbing token and user id from isAuthenticated() helper
	const token = isAuthenticated() && isAuthenticated().token;
	const userId = isAuthenticated() && isAuthenticated().user._id;

	// Add all the products ammount in the cart to checkout
	const getFinalPrice = () => {
		let price = 0;
		products.map((p) => {
			price = price + p.price;
		});
		return price;
	};

	//
	const makePayment = (token) => {
		const body = {
			token,
			products,
		};
		const headers = {
			'Content-Type': 'application/json',
		};
		return fetch(`${API}/stripepayment`, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		})
			.then((response) => {
				console.log(response);
				// can call furthur method here
				const { status } = response;
				console.log('STATUS', status);
				// cardEmpty();
			})
			.catch((err) => console.log(err));
	};

	// conditional rendering of checkout button
	const showStripeButton = () => {
		return isAuthenticated() ? (
			<StripeCheckoutButton
				stripeKey="pk_test_51Mly4CSFWhgOaplCG5Dxx92vIX4nPkyPzDNGNWpumRgv1H2oOTCPi6taZMfvc7ZoXpTUMlEzsXPbc1BkIQUrSivr00iZlNGjMG"
				token={makePayment}
				amount={getFinalPrice() * 100}
				name="Buy T shirt"
				// shippingAddress
				// billingAddress
			>
				<button className="btn btn-success">Stripe Checkout</button>
			</StripeCheckoutButton>
		) : (
			<Link to="/signin">
				<button className="btn btn-warning">Signin</button>
			</Link>
		);
	};

	return (
		<div>
			<h1>stripe section {getFinalPrice()}</h1>
			{showStripeButton()}
		</div>
	);
};

export default StripeCheckout;
