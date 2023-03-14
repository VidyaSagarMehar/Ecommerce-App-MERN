import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
	// all states here
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	// getting product details from backend
	const cardTitle = product ? product.name : 'a photo from pexels';
	const cardDescription = product ? product.description : 'Default description';
	const cardPrice = product ? product.price : 'Default price';

	// Add to cart method using cartHelper
	const addTOCart = () => {
		// we are using a callback becouse we have used 'next'
		addItemToCart(product, () => setRedirect(true));
	};

	// method to reditect user to cart
	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	// Conditional rendering of add to cart and remove from cart button
	// Method to show add to cart button
	const showAddToCart = (addToCart) => {
		return (
			addToCart && (
				<button
					onClick={addTOCart}
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};

	// Method to show remove from cart button (By default it will not shown up)
	const showRemoveFromCart = (removeFromCart) => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			)
		);
	};

	return (
		<div className="card text-white bg-dark border border-info ">
			<div className="card-header lead">{cardTitle}</div>
			<div className="card-body">
				{getARedirect(redirect)}
				<ImageHelper product={product} />
				<p className="lead bg-success font-weight-normal text-wrap">
					{cardDescription}
				</p>
				<p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
				<div className="row">
					<div className="col-12">{showAddToCart(addToCart)}</div>
					<div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
