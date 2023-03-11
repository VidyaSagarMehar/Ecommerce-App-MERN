import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
	// holding values of user using destructuring
	const {
		user: { name, email, role },
	} = isAuthenticated();
	const adminLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-dark text-white">Admin navigation</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/admin/create/category" className="nav-link text-success">
							Crate Categories
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/create/product" className="nav-link text-success">
							Crate Products
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/products" className="nav-link text-success">
							Manage Products
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/orders" className="nav-link text-success">
							Manage Orders
						</Link>
					</li>
				</ul>
			</div>
		);
	};
	const adminRighttSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header">Admin Information</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<span className="badge bg-success mr-2">Name:</span>
						{name}
					</li>
					<li className="list-group-item">
						<span className="badge bg-success mr-2">Email:</span>
						{email}
					</li>
					<li className="list-group-item">
						<span className="badge bg-danger">Admin area</span>
					</li>
				</ul>
			</div>
		);
	};

	return (
		<Base
			title="Welcome to admin dashboard"
			description="Manage all of your products here"
			className="container bg-success p-4"
		>
			<div className="row">
				<div className="col-3"> {adminLeftSide()}</div>
				<div className="col-9">{adminRighttSide()}</div>
			</div>
		</Base>
	);
};

export default AdminDashboard;
