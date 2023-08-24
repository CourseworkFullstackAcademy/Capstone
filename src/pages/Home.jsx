import { useState, useEffect } from 'react';
import { getProducts } from '../utils/api';
import "./home.css"

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        console.log('Fetched products:', productsData); 
      } catch (error) {
        console.error('Error fetching products:', error); 
      }
    }

    fetchProducts();
  }, []);

  // Home component rendering:
  return (
    <div className ="shop">
      <h1 className="shopTitle">Welcome to our E-Commerce Store</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="products">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />            
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;