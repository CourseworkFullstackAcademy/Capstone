import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "./utils/api";
import Home from "./pages/shop/Home";
import Cart from "./pages/cart/Cart";
import { Navbar } from "./components/Navbar";
import CartBanner from "./components/CartBanner";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Checkout from "./pages/checkout/Checkout";
import LoginFromCheckout from "./pages/checkout/LoginFromCheckout";
import SingleProduct from "./pages/Product/SingleProduct";
import "./App.css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState("");
  const [setPaymentSubmitted] = useState(false);
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.length && products.length) {
      const searchResult = products.filter((p) =>
        searchMatches(p, search.toLowerCase())
      );
      console.log("search result: ", searchResult);
      setFilteredProducts(searchResult);
    }
  }, [search, products]);

  //conditionally render cart banner
  const isCartPage = location.pathname === "/cart";

  return (
    <div id="main-section">
      <Navbar
        products={products}
        setProducts={setProducts}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        setSearch={setSearch}
      />
      {isCartPage && <CartBanner />}
      {/* Render CartBanner only on the cart page */}
    <div className="app">  <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              setProducts={setProducts}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <SingleProduct
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              setId={setId}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
        <Route
          path="/cart/checkout"
          element={
            <Checkout
              setPaymentSubmitted={setPaymentSubmitted}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
        <Route
          path="/cart/loginfromcheckout"
          element={
            <LoginFromCheckout
              setToken={setToken}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
      </Routes></div>
    </div>
  );
}

export default App;

function searchMatches(product, text) {
  return product.title.toLowerCase().includes(text);
}
