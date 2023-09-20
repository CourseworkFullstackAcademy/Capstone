import { useState, useEffect } from 'react';
import { Product } from './product';
import "./home.css"



function Home({products, setProducts, filteredProducts, setFilteredProducts}) {  
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [sortOrder, setSortOrder] = useState('asc'); 
 const searchedProducts = filteredProducts ? filteredProducts : products
 
 useEffect(() => {
  // Logic for filtering products based on selectedCategory
  const filtered = products.filter((product) => {
    if (!selectedCategory) return true; // Show all products if no category is selected
    return product.category === selectedCategory;
  });

  // Logic for sorting products based on sortOrder

  // only sort by price
  // const sorted = [...filtered].sort((a, b) => {
  //   if (sortOrder === 'asc') {
  //     return a.price - b.price;
  //   } else {
  //     return b.price - a.price;
  //   }
  // });

  //sort by price and alphabeticlly
  let sorted = [...filtered];

    if (sortOrder === 'price-asc') {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'alphabetical') {
      sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
    }


  setFilteredProducts(sorted);
}, [selectedCategory, sortOrder, products, setFilteredProducts]);

  // Home component rendering:
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Shop GREAT Sales </h1>

{/* Sort only by price */}
      {/* <div className="text-center mb-5 filter-sort">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="men's clothing">Men&apos;s Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women&apos;s Clothing</option>
        </select>
        <button onClick={() => setSortOrder('asc')}>Sort Ascending</button>
        <button onClick={() => setSortOrder('desc')}>Sort Descending</button>
      </div> */}

      <div className="text-center mb-5 filter-sort filter-sort">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelry">Jewelry</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
     
      <div className="row">
     {(searchedProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
          <Product data={product} />
        </div>
        )))}
      </div>
      </div>
     );
}

export default Home;

