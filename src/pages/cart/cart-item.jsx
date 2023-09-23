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
          <div className="mb-4">
            <div className="card">
              <div className="">
                <Link to={`/product/${id}`}>
                  <img src={image} alt={title} className="w-50 mb-3" />
                </Link>
                <Link to={`/product/${id}`}></Link>
              </div>
              
                <Link to={`/product/${id}`} className="text-reset">
                  <h5 className="card-title mb-2">{title}</h5>
                </Link>
                <h6 className="mb-3 price">${price}</h6>
             
              <div className="quantity-controls">
                <button onClick={() => removeFromCart(id)} className=" px-2 font-weight-bold">-</button>
                <input
                  value={cartItems[id]}
                  onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
                  style={{ width: '10%', marginLeft:'.3rem', marginRight:'.3rem', textAlign:'center'}}
                />
                <button onClick={() => addToCart(id)} className=" px-2 font-weight-bold">+</button>
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
