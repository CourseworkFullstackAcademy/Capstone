import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import "./productdetails.css";

export default function SingleProduct() {
  const { id } = useParams();
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          setError("Failed to fetch product");
          return;
        }
        const productData = await response.json();
        
        if (!productData || Object.keys(productData).length === 0) {
          setError('Product data is empty or invalid');
          return;
        }
        console.log("Product Data:", productData);
        setProduct(productData);
      } catch (error) {
        setError(`Error fetching product: ${error.message}`);
      }
    }

    fetchProduct();
  }, [id, setProduct]);

  return (
    <div className="product">
      {product ? (
        <>
          <div>
            <h1>Product Details</h1>
          </div>
          <div className="product-image-container">
            <img src={product.image} alt={product.title} className="product-image img-fluid" />
          </div>
          <div className="product-details">
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
          </div>
          <div>
            <h5>Description</h5>
            <p>{product.description}</p>
          </div>
          <div className="quantity-controls">
            <button onClick={() => removeFromCart(product.id)}> - </button>
            <input
              value={cartItems[product.id]}
              onChange={(e) => updateCartItemCount(Number(e.target.value), product.id)}
            />
            <button onClick={() => addToCart(product.id)}> + </button>
          </div>
          <p>Total: ${product.price * cartItems[product.id]}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}