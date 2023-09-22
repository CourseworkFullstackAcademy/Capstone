import { useState, useEffect } from "react";
import { Product } from "./product";
import PropTypes from "prop-types";
import "./home.css";

function Home({ products, filteredProducts, setFilteredProducts }) {
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc");
  const searchedProducts = filteredProducts ? filteredProducts : products;

  useEffect(() => {
    // Logic for filtering products based on selectedCategory
    const filtered = products.filter((product) => {
      if (!selectedCategory) return true; // Show all products if no category is selected
      return product.category === selectedCategory;
    });

    //sort by price and alphabeticlly
    let sorted = [...filtered];

    if (sortOrder === "price-asc") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "alphabetical") {
      sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(sorted);
  }, [selectedCategory, sortOrder, products, setFilteredProducts]);


  return (
    <div className="body p-0 ">
      <h1 className="text-center mb-4 pt-5">Shop GREAT Sales </h1>
      <div className="text-center mb-0 filter-sort">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mr-4"
        >
          <option value="">All Categories</option>
          <option value="men's clothing">Men&apos;s Clothing</option>
          <option value="jewelery">Jewelry</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women&apos;s Clothing</option>
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

      <div className="row p-5">
        {searchedProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <Product data={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

Home.propTypes = {
  products: PropTypes.array.isRequired,
  filteredProducts: PropTypes.array,
  setFilteredProducts: PropTypes.func,
  filter: PropTypes.string,
};
