import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ShopContext } from "../../context/shop-context";

export function CartItem({ data, onUpdate }) {
  const { cartItems } = useContext(ShopContext);
  const [itemQuantity, setItemQuantity] = useState(cartItems[data.id] || 0);
  const [cartItem, setCartItem] = useState(data);

  useEffect(() => {
    setItemQuantity(cartItems[data.id] || 0);
  }, [cartItems, data]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setItemQuantity(newQuantity);
    updateCartItem(newQuantity);
  };

  const updateCartItem = (newQuantity) => {
    const updatedCartItem = { ...cartItem, quantity: newQuantity };
    setCartItem(updatedCartItem);
    updateCartItems(updatedCartItem);
    onUpdate(updatedCartItem.id, newQuantity);
  };

  return (
    <div className="cart-item">
      <div className="product-image">
        <img src={cartItem.image} alt={cartItem.name} />
      </div>
      <div className="product-details">
        <h3>{cartItem.name}</h3>
        <p>Price: ${cartItem.price}</p>
      </div>
      <div className="quantity-controls">
        <button
          onClick={() => updateCartItem(itemQuantity - 1)}
          disabled={itemQuantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={itemQuantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <button onClick={() => updateCartItem(itemQuantity + 1)}>+</button>
      </div>
      <p>Total: ${cartItem.price * itemQuantity}</p>
    </div>
  );
}

CartItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired, // Add image prop validation
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
