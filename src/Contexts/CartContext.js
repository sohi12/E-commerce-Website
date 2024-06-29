

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({});

  async function getLoggedInCartProduct() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      await getLoggedInCartProduct();
    })();
  }, []);

  console.log(cart);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}