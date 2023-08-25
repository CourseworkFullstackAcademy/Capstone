import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { getProducts } from "../utils/api";



export const ShopContext = createContext({
  cartItems: {},
  addToCart: () => {},
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

  const addToCart = (itemId) => {
    setCartItems({...cartItems, [itemId]: cartItems[itemId] ? cartItems[itemId] + 1 : 1 })};

  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, itemId: prev[itemId] - 1 }));
  // };

  const contextValue = {
    cartItems,
    addToCart,
    //removeFromCart,
  };

  console.log("What is cart itmes? ", cartItems);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
