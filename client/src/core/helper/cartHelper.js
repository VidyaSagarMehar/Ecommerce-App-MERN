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

// helper method to remove item from cart
export const removeItemFromCart = (productId) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		cart.map((product, index) => {
			if (product._id === productId) {
				cart.splice(index, 1);
			}
		});
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	return cart;
};

// helper to empty the cart after payment was successfull
export const cartEmpty = (next) => {
	// if (typeof window !== undefined) {
	// 	localStorage.removeItem('cart');
	// 	next();
	// }
};
