import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {
	// All the states
	const [products, setProducts] = useState([]);

	// getting user and token from isAuthenticated and destructure them
	const { user, token } = isAuthenticated();

	// preload the products from getProducts method of 'adminapicall'
	const preload = () => {
		getProducts()
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		preload();
	}, []);

	// delete product handler
	const deleteThisProduct = (productId) => {
		deleteProduct(productId, user._id, token)
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					preload();
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Base title="Welcome admin" description="Manage products here">
			<Link className="btn btn-info" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<h2 className="mb-4">All products:</h2>
			<div className="row">
				<div className="col-12">
					<h2 className="text-center text-white my-3">Total 3 products</h2>
					{products.map((product, index) => {
						return (
							<div className="row text-center mb-2 ">
								<div className="col-4">
									<h3 className="text-white text-left">{product.name}</h3>
								</div>
								<div className="col-4">
									<Link
										className="btn btn-success"
										to={`/admin/product/update/productId`}
									>
										<span className="">Update</span>
									</Link>
								</div>
								<div className="col-4">
									<button
										onClick={() => {
											deleteThisProduct(product._id);
										}}
										className="btn btn-danger"
									>
										Delete
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Base>
	);
};

export default ManageProducts;
