import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import { CartItem } from "./cart-item";
import { getProducts } from "../../utils/api";

import "./cart.css";
import { clearCart } from "../../utils/localStorageCart";

export default function Cart() {
  // eslint-disable-next-line no-unused-vars
  const { cartItems, setCartItems } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      if (cartItems[product.id] > 0) {
        total += cartItems[product.id] * product.price;
      }
    });
    return total.toFixed(2);
  };

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    for (const itemId in cartItems) {
      totalQuantity += cartItems[itemId];
    }
    return totalQuantity;
  };

  

  return (
    <div>
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1>Your Cart Items</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-3">
              {products.map((product) => {
                if (cartItems[product.id] > 0) {
                  return (
                    <div className="col-md-4 mb-4" key={product.id}>
                      <CartItem
    data={product}
    quantity={cartItems[product.id]} 
    newAmount={cartItems[product.id]} 
  />
</div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="subtotal">
        <h1>Subtotal</h1>
        <h2>&#40; {calculateTotalQuantity()} &#41; items</h2>
        <h2>Total Price: ${calculateTotalPrice()}</h2>
        <Link to="checkout">Proceed to Checkout</Link>
      </div>

      <div className="clear-cart-btn">
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
