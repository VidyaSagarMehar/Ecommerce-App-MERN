import React from 'react';
import '../styles.css';
import { API } from '../backend';
import Base from './Base';

const Home = () => {
	console.log('API IS', API);
	return (
		<Base title="Home Page">
			<h1 className="text-white">Hello frontend</h1>
		</Base>
	);
};
export default Home;
