import { useContext } from "react";
import PropTypes from "prop-types";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
 const { id, title, price, image } = props.data;
 const  { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
 const { newAmount } = props;



  return (
    <div className="product">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image img-fluid" />
      </div>
      <div className="product-details">
        <h3>{title}</h3>
        <p>Price: ${price}</p>
      </div>
      <div className="quantity-controls">
      <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
        
       <button onClick={() => addToCart(id)}> + </button>
      </div>
      <p>Total: ${price * newAmount}</p>
    </div>
    
  );
  
}

CartItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired, 
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  newAmount: PropTypes.number.isRequired,
};
