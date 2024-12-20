import React, { createContext, useEffect, useState } from "react";
import { addtoCartApi, getAllProductApi, getCartProdutcsApi, removeFromCartApi } from "../services/allApi";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }

  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    getAllProduct();

    if(localStorage.getItem('token')){
      getCartProduct()
    }
  }, []);

  // allproduct api

  const getAllProduct = async () => {
    const result = await getAllProductApi();

    setAll_Product(result.data.Products);
  };

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("token")) {
      const bodyData = {
        itemId: itemId,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const result = await addtoCartApi(JSON.stringify(bodyData), headers);

      setCartItems(result.data.result);
      
      
    }
  };

  // getcartproductApi 

  const getCartProduct=async()=>{

    

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const result = await getCartProdutcsApi(headers)

    setCartItems(result.data);
    
    


  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('token')){


      const bodyData = {
        itemId: itemId,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };


      const result = await removeFromCartApi(bodyData,headers)
      
      alert(result.data.message)
      


      

    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount; // Moved outside the loop
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    setCartItems,
    getDefaultCart,
    addToCart,
    removeFromCart,
    getCartProduct
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
