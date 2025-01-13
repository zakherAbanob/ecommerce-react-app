import React, { useContext, useEffect, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { setToken } = useContext(UserContext);
  const [incorrectEmailOrPasswordError, setIncorrectEmailOrPasswordError] =
    useState(null);
  const navigate = useNavigate();

  //* make schema using YUP
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("email is required")
      .email("please enter a valid email"),
    password: Yup.string().required("enter your password"),
  });

  //*Function Handle Submit
  async function handleLogin(formValues) {
    const loadingToastId = toast.loading("Waiting");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: formValues,
      };

      const { data } = await axios.request(options);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        toast.success("logged in successfully ");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setIncorrectEmailOrPasswordError(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId); // will be executed after try or catch every time
    }
  }

  // useFormik with initial values and send it to Function handleSubmit
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <h2 className="text-center py-6 text-xl text-slate-700 font-semibold">
        Login Now
      </h2>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
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
          {incorrectEmailOrPasswordError && (
            <p className="text-red-500 mt text-sm">
              *{incorrectEmailOrPasswordError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn w-1/6 bg-green-700 hover:bg-green-800 text-white text-sm"
        >
          Login
        </button>
        <p>
          didn't have account ?
          <span className="font-semibold">
            <Link to={"/Signup"}>Register Now</Link>
          </span>
        </p>
      </form>
    </>
  );
}
