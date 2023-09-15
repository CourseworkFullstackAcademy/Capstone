export const getCartItems = () => {
	const cart = localStorage.getItem('cart');
	return cart ? JSON.parse(cart) : {};
}

export const updateCartItems = (cart) => {
	localStorage.setItem('cart', JSON.stringify(cart));
};

export const clearCart = () => {
	localStorage.removeItem('cart');
};