//These were all passed cart instead of userCart before trying to render ap cart
export const getCartItems = () => {
	const cart = localStorage.getItem('cart');
	return cart ? JSON.parse(cart) : {};
}

// Define the function to update cart items in local storage when rendering cart from api
export const updateCartItems = (cartItems) => {
	localStorage.setItem("cart", JSON.stringify(cartItems));
  };

//uncomment bleow if adding cart from api does not work
// export const updateCartItems = (cart) => {
// 	localStorage.setItem('cart', JSON.stringify(cart));
// };

export const clearCart = () => {
	localStorage.removeItem('cart');
};