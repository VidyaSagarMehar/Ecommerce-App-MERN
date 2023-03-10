import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { color: '#22CB5C' };
	} else {
		return { color: '#FFFFFF' };
	}
};

const Menu = ({ history }) => {
	return (
		<div>
			<ul className="nav nav-tabs bg-dark">
				<li className="nav-item">
					<Link style={currentTab(history, '/')} className="nav-link" to="/">
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link
						style={currentTab(history, '/cart')}
						className="nav-link"
						to="/cart"
					>
						Cart
					</Link>
				</li>
				<li className="nav-item">
					<Link
						style={currentTab(history, '/user/dashboard')}
						className="nav-link"
						to="/user/dashboard"
					>
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<Link
						style={currentTab(history, '/admin/dashboard')}
						className="nav-link"
						to="/admin/dashboard"
					>
						A.Dashboard
					</Link>
				</li>
				{/* Wrapping signup and signin in react-fragment */}
				{/* condition to show signin & signup button using alternate of terniary operaor */}
				{!isAuthenticated() && (
					<Fragment>
						<li className="nav-item">
							<Link
								style={currentTab(history, '/signup')}
								className="nav-link"
								to="/signup"
							>
								Signup
							</Link>
						</li>
						<li className="nav-item">
							<Link
								style={currentTab(history, '/signin')}
								className="nav-link"
								to="/signin"
							>
								Signin
							</Link>
						</li>
					</Fragment>
				)}
				{/* condition to show signout button using alternate of terniary operaor */}
				{isAuthenticated() && (
					<li className="nav-item">
						<span
							className="nav-link text-warning"
							onClick={() => {
								signout(() => {
									history.push('/');
								});
							}}
						>
							Signout
						</span>
					</li>
				)}
			</ul>
		</div>
	);
};

export default withRouter(Menu);
