import { useContext } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
 const { id, title, price, image } = props.data;
 const  { cartItems, addToCart, removeFromCart, updateCartItemCount, deleteFromCart } = useContext(ShopContext);
 const { newAmount } = props;

 const handleDeleteClick = () => {
  deleteFromCart(id);
};

  return (
    <section>
      <div className="text-center">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card">
              <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
                <Link to={`/product/${id}`}>
                  <img src={image} alt={title} className="w-100" />
                </Link>
                <Link to={`/product/${id}`}>
                  <div className="mask">
                    <div className="d-flex justify-content-start align-items-end h-100">
                     
                    </div>
                  </div>
                  <div className="hover-overlay">
                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                  </div>
                </Link>
              </div>
              <div className="card-body">
                <Link to={`/product/${id}`} className="text-reset">
                  <h5 className="card-title mb-2">{title}</h5>
                </Link>
                <h6 className="mb-3 price">${price}</h6>
              </div>
              <div className="quantity-controls">
                <button onClick={() => removeFromCart(id)}>-</button>
                <input
                  value={cartItems[id]}
                  onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
                />
                <button onClick={() => addToCart(id)}>+</button>
              </div>
              <p>Total: ${price * newAmount}</p>
              <button
          className="removeFromCartBttn d-flex justify-content-center"
          onClick={handleDeleteClick}
        >
          Remove From Cart
        </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  
}

CartItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired, 
  }).isRequired,
   quantity: PropTypes.number.isRequired,
  newAmount: PropTypes.number.isRequired,
};
