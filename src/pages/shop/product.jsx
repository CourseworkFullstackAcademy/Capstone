/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import "./home.css";

export const Product = (props) => {
  const { id, title, price, image } = props.data;
  const { addToCart, cartItems, deleteFromCart } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];
  const isItemInCart = id in cartItems;

  const handleDeleteClick = () => {
    deleteFromCart(id);
  };

  return (
    <section>
      <div className="text-center">
        <div className="row">
          <div className="col mb-4">
            <div className="card">
              <div
                className="img-container bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                data-mdb-ripple-color="light"
              >
                <Link to={`/product/${id}`}>
                  <img src={image} alt={title} className=" img-fluid" />
                </Link>
                <Link to={`/product/${id}`}>
                  <div className="mask">
                    <div className="d-flex justify-content-start align-items-end h-100"></div>
                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                </Link>
              </div>
              <div className="card-body">
                <Link to={`/product/${id}`} className="text-reset">
                  <h5 className="card-title mb-2">{title}</h5>
                </Link>
                <h6 className="mb-3 price">${price}</h6>
              </div>
              <button
                className="addToCartBttn mb-2 d-flex justify-content-center"
                onClick={() => addToCart(id)}
              >
                Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
              </button>
             {isItemInCart && (
        <button
          className="removeFromCartBttn d-flex justify-content-center"
          onClick={handleDeleteClick}
        >
          Remove From Cart
        </button>
      )}
            </div>
          </div>
        </div>
      </div>
    </section>
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
