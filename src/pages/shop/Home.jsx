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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Shop GREAT Sales </h1>
     
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
          <Product data={product} />
        </div>
        ))}
      </div>
      </div>
     );
}

export default Home;