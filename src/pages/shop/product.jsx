/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import "./home.css"

export const Product = (props) => {
  const { id, title, price, image } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];
 
   return (
    <div className="product">
      <Link className="product-link text-dark text-decoration-none"><div className="product-image-container">
        <img src={image} alt={`picture of ${title}`} className="product-image img-fluid" />
      </div>
      <div className="description">
        <p>
          <b>{title}</b>
        </p>		
        <p> ${price}</p>
      </div></Link>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
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
