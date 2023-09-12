import { useState, useEffect } from 'react';
import { getProducts } from '../../utils/api';
import { Product } from './product';
import "./home.css"

//Right now, only renders list of fetched products
function Home() {
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

  // Home component rendering:
  return (
    <div className ="shop">
      <h1 className="shopTitle">Welcome to &quot;Insert cool name here&quot; </h1>
      <div className="container">
        <div className="row">
      <div className="col-xs-3">
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
      </div>
      </div>
      </div>
  
  );
}

export default Home;