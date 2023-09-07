/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, title, price, image } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

 // const cartItemCount = cartItems[id];
  console.log("cartItems[id]", id);
   return (
    <div className="product">
      <img src={image} />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>		
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart
      </button>
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
  }).isRequired,
};
