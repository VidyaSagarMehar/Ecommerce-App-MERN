import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoute = ({ component: Component, ...rest }) => {
	// holding authentication values/jwt in user
	const { user } = isAuthenticated();
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated() && user.role === 1 ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/signin', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default AdminRoute;
