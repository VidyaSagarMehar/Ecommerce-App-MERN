import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
// import BrainTreePament from './BrainTreePament';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
// import StripeCheckout from './StripeCheckout';

const Cart = () => {
	// All the states
	const [products, setProducts] = useState([]);
	// to forcefully reload the component after removing product from cart
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [reload]);

	// for showing all the products
	const loadAllProducts = (products) => {
		return (
			<div>
				<h2>This section is to load products</h2>
				{products.map((product, index) => {
					return (
						<Card
							key={index}
							product={product}
							removeFromCart={true}
							addToCart={false}
							setReload={setReload}
							reload={reload}
						/>
					);
				})}
			</div>
		);
	};

	// for showing checkout section
	const loadCheckout = () => {
		return (
			<div>
				<h2>This section is to load checkot</h2>
			</div>
		);
	};

	return (
		<Base title="Cart Page" description="Ready to Checkout">
			<div className="row text-center">
				<div className="col-6">
					{products.length > 0 ? (
						loadAllProducts(products)
					) : (
						<h3>no products in cart</h3>
					)}
				</div>
				<div className="col-6">
					<h3>Payment getway here</h3>
					{/* <StripeCheckout products={products} setReload={setReload} /> */}
					{/* <BrainTreePament products={products} setReload={setReload} /> */}
				</div>
			</div>
		</Base>
	);
};
export default Cart;
