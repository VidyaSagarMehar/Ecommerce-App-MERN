// helper method for addToCart
export const addItemToCart = (item, next) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		cart.push({
			...item,
			count: 1,
		});
		localStorage.setItem('cart', JSON.stringify(cart));
		next();
	}
};

// Helper method for loadCart
export const loadCart = () => {
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart'));
		}
	}
};
