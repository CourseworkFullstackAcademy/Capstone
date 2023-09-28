// import { useContext } from "react";
// import PropTypes from "prop-types";
// import { ShopContext } from "../../context/shop-context";
// import "./productdetails.css";

// export const ProductDetails = (props) => {
//   const { id, title, price, image, description } = props.data;
//   const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
//     useContext(ShopContext);
//   const { newAmount } = props;
// console.log("props.data: ", props.data)
//   return (
//     <div className="product">
//       <div>
//         <h1>Product Details</h1>
//       </div>
//       <div className="product-image-container">
//         <img src={image} alt={title} className="product-image img-fluid" />
//       </div>
//       <div className="product-details">
//         <h3>{title}</h3>
//         <p>Price: ${price}</p>
//       </div>
//       <div>
//         <h5>Description</h5>
//         <p>{description}</p>
//       </div>
//       <div className="quantity-controls">
//         <button onClick={() => removeFromCart(id)}> - </button>
//         <input
//           value={cartItems[id]}
//           onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
//         />

//         <button onClick={() => addToCart(id)}> + </button>
//       </div>
//       <p>Total: ${price * newAmount}</p>
//     </div>
//   );
// };

// ProductDetails.propTypes = {
//   data: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//   }).isRequired,
//   newAmount: PropTypes.number.isRequired,
// };
