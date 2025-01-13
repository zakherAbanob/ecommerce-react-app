import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  //Spinner
  const [loading, setLoading] = useState(false);
  const [currentProductID, setCurrentProductID] = useState(0);
  //
  let { addProductToCart, setCartInfo } = useContext(CartContext);

  //* add product
  async function addProduct(productId) {
    setCurrentProductID(productId);
    setLoading(true);

    try {
      let response = await addProductToCart(productId); // function from CartContext

      if (response.data.status === "success") {
        setCartInfo(response.data); // to udate cart info in cartContext
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the product to the cart.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  //
  // const [recentProducts, setRecentProducts] = useState(null);
  // async function getRecentProducts() {
  //   const options = {
  //     url: "https://ecommerce.routemisr.com/api/v1/products",
  //     method: "GET",
  //   };

  //   const { data } = await axios.request(options);
  //   setRecentProducts(data.data);
  //   //console.log(data);
  // }

  // useEffect(() => {
  //   MountingPhase we call the function to display Products once the user login
  //   getRecentProducts();
  // }, []);

  //! Using Query
  //* Using Query===> props of using useQuery => saving response of data from API in cach
  //* so we can use this response in any component without refresh or refitching datatProducts();
  //* the request can be reusable in other components

  function getRecentProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecentProducts,
    //refetchInterval: 5000,
    // staleTime: 5000,
    // retry: 5,
    // retryDelay: 3000,
    // select: (data) => data.data.data,
  });
  //console.log(data);

  if (isLoading) {
    return <Loading />;
    // once opened ==> isLoading ? yes  and Data is undefined ====> display <Loading />
    // after change data ==> component will be reRender
    // isLoading ? No and date backed from API ====> it will display data
  }

  if (isError) {
    return (
      <div className="py-8 w-full flex justify-center">
        <h3>{error.message}</h3>;
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data?.data.data.map((product) => (
          <div key={product.id} className="shadow-md">
            <div className="product py-4">
              <Link to={`/ProductDetails/${product.id}`}>
                <img
                  className="w-full"
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className="block font-light text-green-800">
                  {product.category.name}
                </span>
                <h3 className="text-lg font-normal text-gray-800 mb-4">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-400"></i>
                  </span>
                </div>
              </Link>
              <button
                onClick={() => addProduct(product.id)}
                className="btn bg-primary w-full"
              >
                {currentProductID === product.id && loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
