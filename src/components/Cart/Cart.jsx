import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Cart() {
  //
  let {
    getLoggedUserCart,
    updateProductItemCount,
    removeItemProduct,
    setCartInfo,
    ClearCart,
    cartInfo,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  //
  //* Get Cart Items
  async function getCart() {
    // getCart is a wrapper/helper function around getLoggedUserCart
    setLoading(true);
    try {
      const response = await getLoggedUserCart();
      setCartDetails(response.data.data); // Update cart details
    } catch (error) {
      console.error("Error fetching cart details:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  //* Update Cart items
  async function updateCartCount(productId, count) {
    let response = await updateProductItemCount(productId, count);
    //console.log(response.data.data);
    setCartDetails(response.data.data); // re-render
    setCartInfo(response.data);
    toast.success("item updated");
  }

  //* Remove Cart item
  async function deleteCartItem(productId) {
    let response = await removeItemProduct(productId);
    //console.log(response.data.data);
    setCartDetails(response.data.data); // re-render
    setCartInfo(response.data);
    toast.success("item removed");
  }

  //* Clear Cart
  async function ClearAllCart() {
    try {
      const response = await ClearCart();
      setCartDetails(response.data.data); // Re-render with cleared cart
      setCartInfo({ numOfCartItems: 0, totalCartPrice: 0 });
      toast.success("Your cart is cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  useEffect(() => {
    getCart(); //* Keep useEffect focused only on calling a function rather than including all logic inline.
    //
    //* explain Component didMount
    //* [cartDetails?.products.map((products)=>)] why we put ? after cartDetails
    // 1- Component didMount and create once opened Cart
    // 2- cartDetails = null
    // 3- return response from API
    // 4- setCartDetails = (response.data.data)
    // 5- Re-render the Component
    // 6- cartDetails = response.data.data
    // * So cartDetails with (?)  ==> it prevent produts from maping before return response from API and cartDetails != null
  }, []);

  if (loading) {
    return <Loading />; // Show loading state
  }

  return (
    <>
      {cartInfo?.numOfCartItems === 0 ? (
        <div>
          <h2 className="py-12">Your Cart is Empty, start Shopping now</h2>
          <Link
            to={`/`}
            className="btn bg-primary hover:bg-green-800 text-white"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="mx-auto py-10">
          <h2 className="text-2xl py-4 text-center text-primary">
            Shopping Cart
          </h2>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product, index) => (
                  <tr
                    key={`${product.product.id} - ${index}`}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Link to={`/ProductDetails/${product.product.id}`}>
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product.title}
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateCartCount(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateCartCount(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <span>{product.price} EGP</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteCartItem(product.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="text-center py-4 text-slate-600 text-lg font-light">
              your total Price: {cartDetails?.totalCartPrice} <span>EGP</span>
            </h3>
            <div className="flex justify-center items-center">
              <Link to={"/Checkout"}>
                <button className="btn w-full bg-primary text-white">
                  Order Now
                </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <button
              onClick={() => ClearAllCart()}
              className="btn bg-red-700 text-white"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
