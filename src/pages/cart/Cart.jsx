import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { getProducts } from '../../utils/api';
import "./cart.css";


export default function Cart() {
  const { cartItems } = useContext(ShopContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error); 
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="cart">
      <div className="cart-title">
        <h1>Your Cart Items</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-3">
            {products.map((product) => {
              //used > 0 instead of !== 0 because !==0 was still rendering all products, not just the ones on the cart
              if (cartItems[product.id] > 0) {
                return <CartItem data={product} key={product.id} />
              }
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}

