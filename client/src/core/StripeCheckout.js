import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';

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

	// conditional rendering of checkout button
	const showStripeButton = () => {
		return isAuthenticated() ? (
			<button className="btn btn-success">Stripe Checkout</button>
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
