import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(UserContext);

  async function getUserOrders() {
    try {
      const { id } = jwtDecode(token);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {orders && orders.length > 0 ? (
        <section className="py-12 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order mx-auto border-2 border-gray-400 border-opacity-25 rounded-lg"
            >
              <header className="flex justify-between items-center">
                <div>
                  <h2 className="mx-2 text-gray-500 text-lg">Order ID</h2>
                  <span className="mx-2 text-lg font-semibold">
                    #{order.id}
                  </span>
                </div>
                <div>
                  {order.isDelevered ? (
                    <span className="inline-block px-3 mx-2 py-1 bg-blue-500 text-white font-semibold rounded-full">
                      delevered
                    </span>
                  ) : (
                    <span className="inline-block px-3 mx-2 py-1 bg-blue-500 text-white font-semibold rounded-full">
                      waiting delevery
                    </span>
                  )}
                  {order.isPaid ? (
                    <span className="inline-block px-3 py-1 bg-lime-500 text-white font-semibold rounded-full mx-2">
                      Paid
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-red-500 text-white font-semibold rounded-full mx-2">
                      Not Paid
                    </span>
                  )}
                </div>
              </header>
              {/* //w-1/6 mt-4 */}
              <div className="w-3/4 grid md:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
                {order.cartItems.map((product) => (
                  <div
                    key={product._id}
                    className="product-item py-1 overflow-hidden mx-1 my-2 border-2 border-gray-400 border-opacity-40 rounded-lg"
                  >
                    <Link to={`/productDetails/${product.product.id}`}>
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-full"
                      />
                    </Link>
                    <div className="p-4">
                      <h3 className="mx-2 text-sm font-semibold line-clamp-2">
                        <Link to={`/productDetails/${product.product.id}`}>
                          {product.product.title}
                        </Link>
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <p>
                          <span className="text-sm font-bold ">
                            Count: {product.count}
                          </span>
                        </p>
                        <span className=" text-sm ">{product.price} L.E</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-lg mt-1 mx-2">
                Your Total order Price is{" "}
                <span className="mx-1 font-bold text-gray-800">
                  {order.totalOrderPrice}
                </span>{" "}
                L.E
              </p>
            </div>
          ))}
        </section>
      ) : (
        <div>
          <h2 className="py-12">You didn't order before, start Shopping now</h2>
          <Link
            to={`/`}
            className="btn bg-primary hover:bg-green-800 text-white"
          >
            Back to Home
          </Link>
        </div>
      )}
    </>
  );
}
