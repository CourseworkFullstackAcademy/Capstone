import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { getProducts } from '../../utils/api';
import "./cart.css";
import { Product } from "../shop/product";

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
              if (cartItems[product.id] > 0) {
                return <CartItem data={product} />
              }
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}

