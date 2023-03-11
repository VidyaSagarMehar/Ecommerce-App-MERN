import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
	// All the states
	const [name, setName] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	// holding values of user and token using destructuring
	const { user, token } = isAuthenticated();

	// Success message
	const successMessage = () => {
		if (success) {
			return <h4 className="text-success">Category created successfully</h4>;
		}
	};

	// Warning message
	const warningMessage = () => {
		if (error) {
			return <h4 className="text-success">Failed to create category</h4>;
		}
	};

	// create category Form for admin
	const myCategoryForm = () => {
		return (
			<form>
				<div className="form-group">
					<p className="lead">Enter the category</p>
					<input
						type="text"
						className="form-control my-3"
						onChange={handleChange}
						value={name}
						autoFocus
						required
						placeholder="For ex. Summer"
					/>
					<button onClick={onSubmit} className="btn btn-outline-info mb-2">
						Create Category
					</button>
				</div>
			</form>
		);
	};
	// go back button
	const goBack = () => {
		return (
			<div className="mt-5">
				<Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
					Admin Home
				</Link>
			</div>
		);
	};

	// handle change method
	const handleChange = (event) => {
		setError('');
		setName(event.target.value);
	};

	// handle submit method
	const onSubmit = (event) => {
		event.preventDefault();
		setError('');
		setSuccess(false);

		// backend request fired
		// name should be come as object becouse we stringified it
		createCategory(user._id, token, { name })
			.then((data) => {
				if (data.error) {
					setError(true);
				} else {
					setError('');
					setSuccess(true);
					setName('');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Base
			title="Create a category "
			description="Add a category"
			className="container bg-info p-4"
		>
			<div className="row bg-white rounded">
				<div className="col-md-8 offset-md-2">
					{successMessage()}
					{warningMessage()}
					{myCategoryForm()}
					{goBack()}
				</div>
			</div>
		</Base>
	);
};

export default AddCategory;
