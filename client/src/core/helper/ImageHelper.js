import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({ product }) => {
	// conditional rendering of image
	const imageUrl = product
		? `${API}/product/photo/${product._id}`
		: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;
	return (
		<div className="rounded border border-success p-2">
			<img
				src={imageUrl}
				alt="photo"
				style={{ maxHeight: '100%', maxWidth: '100%' }}
				className="mb-3 rounded"
			/>
		</div>
	);
};

export default ImageHelper;
