import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Checkout() {
  let { CashCheckOut, OnlineCheckOut, cartInfo } = useContext(CartContext);
  //console.log( cartInfo);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    city: Yup.string().required("City is required"),
    details: Yup.string()
      .required("Details are required")
      .min(10, "Details must be at least 10 characters"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: () => {
      if (paymentMethod === "cash") {
        PayCash(cartInfo.cartId);
      } else {
        PayOnline(cartInfo.cartId, location.origin);
      }
    },
  });

  //* Online Checkout
  async function PayOnline(cartId, url) {
    let { data } = await OnlineCheckOut(cartId, url, formik.values);
    //console.log(data);
    if (data.status === "success") {
      toast.loading("Redirecting");
      setTimeout(() => {
        window.location.href = data.session.url;
      }, 2000);
    }
  }

  //* chash Checkout
  async function PayCash(cartId) {
    let toastId = toast.loading("we are creating your order...");
    try {
      let { data } = await CashCheckOut(cartId, formik.values);
      //console.log(data);

      if (data.status === "success") {
        toast.success("Your order has been created successfully");
        setTimeout(() => {
          navigate("/allOrders");
        }, 2000);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <>
      <div className="py-10 max-w-xl mx-auto">
        <h3 className="text-center py-6 text-xl text-slate-700 font-semibold">
          Checkout Now
        </h3>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="tel"
              className="form-control w-full"
              placeholder="Enter your phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}
          </div>

          <div>
            <input
              type="text"
              className="form-control w-full"
              placeholder="Enter your city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.city && formik.touched.city && (
              <div className="text-red-500 text-sm">{formik.errors.city}</div>
            )}
          </div>

          <div>
            <textarea
              type="text"
              className="form-control w-full"
              placeholder="Enter your details"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.errors.details && formik.touched.details && (
              <div className="text-red-500 text-sm">
                {formik.errors.details}
              </div>
            )}
          </div>

          <button
            onClick={() => setPaymentMethod("online")}
            type="submit"
            className="btn mr-3 bg-lime-600 hover:bg-green-700 text-white text-sm"
          >
            Pay Online
          </button>
          <button
            onClick={() => setPaymentMethod("cash")}
            type="submit"
            className="btn  bg-blue-500 hover:bg-blue-700 text-white text-sm"
          >
            Pay Cash
          </button>
        </form>
      </div>
    </>
  );
}
