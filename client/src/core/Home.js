import React from 'react';
import '../styles.css';
import { API } from '../backend';

const Home = () => {
	console.log('API IS', API);
	return (
		<div>
			<h1 className="text-white">Hello frontend</h1>
		</div>
	);
};
export default Home;