import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { getCategories, deleteCategory } from './helper/adminapicall';

const ManageCategories = () => {
	// All the states
	const [categories, setCategories] = useState([]);

	// getting user and token from isAuthenticated and destructure them
	const { user, token } = isAuthenticated();

	// preload the products from getProducts method of 'adminapicall'
	const preload = () => {
		getCategories()
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setCategories(data);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		preload();
	}, []);

	// delete category handler
	const deleteThisCategory = (categoryId) => {
		deleteCategory(categoryId, user._id, token)
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
			<h2 className="mb-4">All Categories:</h2>
			<Link className="btn btn-info" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<div className="row">
				<div className="col-12">
					<h2 className="text-center text-white my-3">Total 3 products</h2>
					{categories.map((category, index) => {
						return (
							<div className="row text-center mb-2">
								<div className="col-4">
									<h3 className="text-white" key={index}>
										{category.name}
									</h3>
								</div>
								<div className="col-4">
									<Link
										className="btn btn-success"
										to={`/admin/category/update/${category._id}`}
									>
										<span className="">Update</span>
									</Link>
								</div>
								<div className="col-4">
									<button
										onClick={() => {
											deleteThisCategory(category._id);
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

export default ManageCategories;
