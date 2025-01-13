import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { data, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import useOnline from "../../Hooks/UseOnline";

export default function ProductDetails() {
  let isOnline = useOnline();
  const [isLoading, setIsLoading] = useState(true);
  //
  let { addProductToCart, setCartInfo } = useContext(CartContext); // destruct addProductToCart from cartContext

  //* add Product
  async function addProduct(productId) {
    try {
      let response = await addProductToCart(productId); // function from CartContext

      if (response.data.status === "success") {
        setCartInfo(response.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the product to the cart.");
      console.error(error);
    } finally {
    }
  }
  //

  // destruct id from url using useParams hook which it hooks the params sent in url
  let { id } = useParams();

  const [productDetails, setProductDetails] = useState(null);
  async function getId(id) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };

      let { data } = await axios.request(options);
      setProductDetails(data.data);
      //console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getId(id);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row ">
          <div className="w-1/4 py-10 ">
            <ReactImageGallery
              showFullscreenButton={false}
              showPlayButton={false}
              showNav={false}
              items={productDetails.images.map((image) => {
                return {
                  original: image,
                  thumbnail: image,
                };
              })}
            />
          </div>
          <div className="w-3/4 p-6">
            <h1 className="text-lg font-normal text-gray-950">
              {productDetails?.title}
            </h1>
            <p>{productDetails?.description}</p>
            <div className="flex my-4 justify-between items-center">
              <span>{productDetails?.price} EGP</span>
              <span>
                {productDetails?.ratingsAverage}{" "}
                <i className="fas fa-star text-yellow-400"></i>
              </span>
              {isOnline && (
                <button
                  onClick={() => addProduct(id)}
                  className="btn bg-primary"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
