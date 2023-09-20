import { useState } from "react";

function ProductSearch({ products, setProducts, filteredProducts, setFilteredProducts, setSearch }) {
 




  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);}



  return (
    <div>
      <form>
        <input className="my-3" onChange={handleSearchInputChange} />
         
          <button  type="submit" onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'>Search             
            </button>
      
      </form>
    </div>
  );
}

export default ProductSearch;


