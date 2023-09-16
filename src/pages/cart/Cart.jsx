import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import { CartItem } from "./cart-item";
import { getProducts } from "../../utils/api";
//import { clearCart } from "../../utils/localStorageCart";
import "./cart.css";


export default function Cart() {
  // eslint-disable-next-line no-unused-vars
  const { cartItems, setCartItems, clearCart } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [cartKey, setCartKey] = useState(0);

 

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

  useEffect(() => {
    // Check if the cart is empty
    const isEmptyCart = Object.values(cartItems).every(
      (quantity) => quantity === 0
    );
    setIsEmpty(isEmptyCart);
  }, [cartItems]);

  useEffect(() => {
    // Check if the cart is empty after logout and trigger a re-render
    if (Object.keys(cartItems).length === 0) {
      setIsEmpty(true);
    }
  }, [cartItems]);

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

  const handleClearCart = () => {
   
   clearCart();
   setCartItems({});
   setIsEmpty(true);

   // Increment the cart key to force re-render of empty cart after logout
   setCartKey((prevKey) => prevKey + 1);

  };
  

  return (
    <div  key={cartKey}>
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1>Your Cart Items</h1>
        </div>
        <div className="container">
          <div className="">
            <div className="">
              {isEmpty ? (
                <div><p>Your cart is empty.</p>
                <div> <Link to="/">Continue Shopping</Link></div>
                </div>
                
              ) : (
                products.map((product) => {
                  if (cartItems[product.id] > 0) {
                    return (
                      <div className="col" key={product.id}>
                        <CartItem
                          data={product}
                          quantity={cartItems[product.id]}
                          newAmount={cartItems[product.id]}
                        />
                      </div>
                    );
                  }
                })
              )}
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
        <button onClick={handleClearCart}>Clear Cart</button>
      </div>
      <div> <Link to="/">Continue Shopping</Link></div>
    </div>
  );
}
