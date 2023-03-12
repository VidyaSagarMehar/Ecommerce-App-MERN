import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { createProduct, getCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

const AddProduct = () => {
	const { user, token } = isAuthenticated();
	// All the states
	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		photo: '',
		categories: [],
		category: '',
		loading: false,
		error: '',
		createdProduct: '',
		getaRedirect: false,
		formData: '',
	});

	// Destructuring the values
	const {
		name,
		description,
		price,
		stock,
		categories,
		category,
		loading,
		error,
		createdProduct,
		getaRedirect,
		formData,
	} = values;

	// preload the categories in select options from getCategories method of 'adminapicall'
	const preload = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, categories: data, formData: new FormData() });
				console.log(categories);
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	// On submit handler
	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: '', loading: true });
		createProduct(user._id, token, formData)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						name: '',
						description: '',
						price: '',
						photo: '',
						stock: '',
						loading: false,
						getaRedirect: true,
						createdProduct: data.name,
					});
				}
			})
			.catch((err) => console.log(err));
	};

	// TODO: if getaRedirect: true,  redirect to admin home page

	// handle change handler to handle image upload and other
	const handleChange = (name) => (event) => {
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	// success message
	const successMessage = () => {
		return (
			<div
				className="alert alert-success mt-3"
				style={{ display: createdProduct ? '' : 'none' }}
			>
				<h4>{createdProduct} created successfully</h4>
			</div>
		);
	};
	// warning message
	// const warningMessage = () => {
	// 	return (
	// 		<div
	// 			className="alert alert-warning mt-3"
	// 			style={{ display: !createProduct ? '' : 'none' }}
	// 		>
	// 			<h4>failed to create</h4>
	// 		</div>
	// 	);
	// };

	// Form to create a product
	const createProductForm = () => (
		<form>
			<span>Post photo</span>
			<div className="form-group">
				<label className="btn btn-block btn-success">
					<input
						onChange={handleChange('photo')}
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange('name')}
					name="photo"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={handleChange('description')}
					name="photo"
					className="form-control"
					placeholder="Description"
					value={description}
				/>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange('price')}
					type="number"
					className="form-control"
					placeholder="Price"
					value={price}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange('category')}
					className="form-control"
					placeholder="Category"
				>
					<option>Select</option>
					{categories &&
						categories.map((cate, index) => (
							<option key={index} value={cate._id}>
								{cate.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange('stock')}
					type="number"
					className="form-control"
					placeholder="stock"
					value={stock}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success"
			>
				Create Product
			</button>
		</form>
	);
	return (
		<Base
			title="Add product here!"
			description="Welcome to product creation section"
			className="container bg-info p-4 "
		>
			<Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
				Admin Home
			</Link>
			<div className="row bg-dark text-white rounded container">
				{successMessage()}
				{/* {warningMessage()} */}
				<div className="col-md-8 offset-md-2">{createProductForm()}</div>
			</div>
		</Base>
	);
};

export default AddProduct;
