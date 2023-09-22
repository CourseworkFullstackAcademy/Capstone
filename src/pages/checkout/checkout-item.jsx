import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import PropTypes from "prop-types";

function CheckoutItem({ itemId, quantity, products }) {
  // eslint-disable-next-line no-unused-vars
  const { cartItems, removeFromCart, updateCartItemCount, addToCart } =
    useContext(ShopContext);
  const product = products.find((p) => p.id === parseInt(itemId));

//chekcing status of product
if (!product) {
    return (
      <div className="mb-4">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <Link to={`/product/${itemId}`} className="text-decoration-none"><div className="d-flex">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-3"
          style={{ width: "100px" }}
        />
        <div className="checkout-description ms-3">
          <span className="mb-0 text-price">${product.price.toFixed(2)}</span>
          <p className="mb-0 text-descriptions">{product.title}</p>
          <p className="text-descriptions mt-0">
            Qty:
            <span className="text-descriptions fw-bold"> {quantity}</span>
          </p>
        </div>
      </div></Link>
      <div className="mt-3">
        <button
          onClick={() => removeFromCart(itemId)}
          className="btn btn-danger me-2"
        >
          Remove
        </button>
        <input
          value={quantity}
          onChange={(e) => updateCartItemCount(Number(e.target.value), itemId)}
          type="number"
          min="1"
        />
        <button
          onClick={() => addToCart(itemId)}
          className="btn btn-primary ms-2"
        >
          Add
        </button>
      </div>
      <div className="mt-3">
        <span className="mb-0 text-price">
          Total: ${(product.price * quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default CheckoutItem;

CheckoutItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};
