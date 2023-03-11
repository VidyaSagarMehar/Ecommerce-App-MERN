import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		didRedirect: false,
	});

	// Destructuring the state values
	const { email, password, error, loading, didRedirect } = values;

	// holding authentication values/jwt in user
	const { user } = isAuthenticated();

	// handle onChange method
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	// handle onSubmit of form
	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				// If error
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				}
				// If no error
				else {
					authenticate(data, () => {
						setValues({
							...values,
							didRedirect: true,
						});
					});
				}
			})
			.catch((err) => console.log(err));
	};

	// Logic to redirect
	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to="/" />;
		}
	};

	// Alert messege for loading
	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading...</h2>
				</div>
			)
		);
	};

	// Alert messege for error
	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? '' : 'none' }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const signInForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className="text-light">Email</label>
							<input
								onChange={handleChange('email')}
								value={email}
								className="form-control"
								type="email"
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								onChange={handleChange('password')}
								value={password}
								className="form-control"
								type="password"
							/>
						</div>
						<button
							onClick={onSubmit}
							className="btn btn-success btn-block form-control mt-2"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	};
	return (
		<Base title="Sign in Page" description="A page for user to sign up">
			{loadingMessage()}
			{errorMessage()}
			{signInForm()}
			{performRedirect()}
			<p className="text-white">{JSON.stringify(values)}</p>''
		</Base>
	);
};
export default Signin;
