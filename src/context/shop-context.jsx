/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getProducts } from "../utils/api";



export const ShopContext = createContext({
  cartItems: {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemCount: () => {},
});

const getDefaultCart = async () => {
  let cart = {};
  const products = await getProducts();
  for (let i = 0; i < products.length; i++) {
    cart[products[i].id] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);


  //trying to get dollar total of cart items.
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const productsData = await getProducts();
  //       setProducts(productsData); // Update the products state with fetched data
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   }

  //   fetchData();
  // }, []); 
 
  

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  // for (const item in cartItems) {
  //   if (cartItems[item] > 0) {
  //     let itemInfo = products.find((product) => product.id === Number(item));
  //     if (itemInfo) {
  //       totalAmount += cartItems[item] * itemInfo.price;
  //     }
  //     console.log(totalAmount);
  //   }
  // }
  // return totalAmount.toFixed(2);
  // };

  const addToCart = (itemId) => {
    setCartItems({...cartItems, [itemId]: cartItems[itemId] ? cartItems[itemId] + 1 : 1 })};

   const removeFromCart = (itemId) => {
    setCartItems({...cartItems, [itemId]: cartItems[itemId] ? cartItems[itemId] - 1 : 1 })};

    const updateCartItemCount = (newAmount, itemId) => {
      setCartItems({...cartItems, [itemId]: newAmount})
    }

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
   // getTotalCartAmount
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
