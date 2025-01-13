import React, { useContext, useEffect, useState } from "react";
import Style from "./SignUp.module.css";
import { useFormik } from "formik";
import axios, { Axios } from "axios";
import { data, Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function SignUp() {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  const navigate = useNavigate();

  const [accountExistError, setAccountExist] = useState(null); // to check email is exist or not

  //* make schema using YUP
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .required("email is required")
      .email("please enter a valid email"),
    password: Yup.string()
      .required("enter your password")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: Yup.string()
      .required("confirm password")
      .oneOf([Yup.ref("password")], "password and confirm must be the same"),
    phone: Yup.string()
      .required("phone number is required")
      .matches(phoneRegex, "number must be an egyptian number"),
  });

  //*Handle Submit Function
  async function handleRegister(formValues) {
    //& useFormik send the initial values to the function that linked to useFormik (onSubmit) as a parameter (formValues)
    //
    //* We call Api here when the user submit and send formValues to backend
    const loadingToastId = toast.loading("Waiting");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: formValues,
      };

      const { data } = await axios.request(options);
      //console.log(data);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        //
        //* after user make regestiration change setUserLogin from null in userContext to data.token
        //
        toast.success("user created successfully");
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      }
    } catch (error) {
      // console.log(error);
      console.log(error.response.data);

      setAccountExist(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId); // will be executed after try or catch every time
    }
  }

  // useFormik with initial values and send it to Function handleSubmit
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <h2 className="text-center py-6 text-xl text-slate-700 font-semibold">
        Register Now
      </h2>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            className="form-control w-full"
            placeholder="Type your Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 mt text-sm">*{formik.errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            className="form-control w-full"
            placeholder="Type your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 mt text-sm">*{formik.errors.email}</p>
          )}
          {accountExistError && (
            <p className="text-red-500 mt text-sm">*{accountExistError}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            className="form-control w-full"
            placeholder="Type your password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 mt text-sm">*{formik.errors.password}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            className="form-control w-full"
            placeholder="Type your repassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 mt text-sm">
              *{formik.errors.rePassword}
            </p>
          )}
        </div>
        <div>
          <input
            type="tel"
            className="form-control w-full"
            placeholder="Type your number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 mt text-sm">*{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn w-1/6 bg-green-700 hover:bg-green-800 text-white text-sm"
        >
          Sign Up
        </button>
        <p>
          have account ?{" "}
          <span className="font-semibold">
            <Link to={"/Login"}>Login Now</Link>
          </span>
        </p>
      </form>
    </>
  );
}
