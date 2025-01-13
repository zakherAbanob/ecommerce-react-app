import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  //console.log("headers: ", headers);

  const [cartInfo, setCartInfo] = useState(null); // cartInfo must be up to date always

  //! the return from any function here we use it as a prop in the component Cart
  //

  //* get Products in Cart user who logged in
  async function getLoggedUserCart() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers, // configration object
        }
      ); //=> arrow function without {} => return what you want (it's implicity return )
      return response;
    } catch (error) {
      return error;
    } //     return error if error
  }

  //* add products to cart
  async function addProductToCart(productId) {
    // productId is a parameter in the function
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          // Body
          productId: productId,
        },
        {
          // configration object
          headers,
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  //* updata count of items products in cart
  async function updateProductItemCount(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers,
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  //* delete item from in cart
  async function removeItemProduct(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  //* Clear Cart
  async function ClearCart() {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  //* Online CheckOut
  async function OnlineCheckOut(cartId, url, formValues) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formValues,
        },
        {
          headers,
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  //* Cash CheckOut
  async function CashCheckOut(cartId, formValues) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: formValues,
        },
        {
          headers,
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  //* get CartInfo
  async function getCartInfo() {
    let response = await getLoggedUserCart();
    setCartInfo(response.data);
    //console.log(response.data.cartId);
  }

  useEffect(() => {
    getCartInfo(); // once open==> call getCartInfo => return response from getLoggedUserCart
  }, []);

  return (
    <CartContext.Provider
      value={{
        getLoggedUserCart,
        addProductToCart,
        updateProductItemCount,
        removeItemProduct,
        OnlineCheckOut,
        CashCheckOut,
        cartInfo,
        setCartInfo,
        ClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

//* any Context in React ===> Re-render the Component once using any function or any props from the Context at any other component
