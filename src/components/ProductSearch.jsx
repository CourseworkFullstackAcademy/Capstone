import PropTypes from "prop-types";
import "./navbar.css"

function ProductSearch({ setSearch }) {
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <form>
        {/* add onSubmit={} */}
        <input
          className="my-3 mr-2"
          type="text"
          onChange={handleSearchInputChange}
        />
        <button
          type="submit"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="nav-btn rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default ProductSearch;

ProductSearch.propTypes = {
  setSearch: PropTypes.object.isRequired,
};
