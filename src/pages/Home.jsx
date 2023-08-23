import { useState, useEffect } from 'react';
//import { getProducts } from '../utils/api';
import { sortPriceResults } from '../utils/api';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await sortPriceResults();
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
    <div>
      <h1>Welcome to our E-Commerce Store</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;