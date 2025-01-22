import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Cart from "../Cart/Cart";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartInfo } = useContext(CartContext); // to display cartInfo from CartContext
  //console.log("Cart info: ", cartInfo);

  return (
    <>
      <nav className="bg-slate-200 shadow-sm text-center fixed top-0 left-0 right-0 z-50 ">
        <div className="container justify-between flex items-center gap-12 mx-auto py-2">
          <a href="">{<img src={freshCartLogo} alt="freshCartLogo" />}</a>

          {/* UL LOGO && HOME */}
          <ul className="flex gap-5 items-center">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative before:content-[''] before:absolute before:w-0 before:h-0.5 before:bg-primary hover:before:w-full before:transition-all before:duration-300 before:left-0 before:-bottom-1 ${
                    isActive ? "before:w-full font-semibold" : ""
                  }`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  ` relative before:content-[''] before:absolute before:w-0 before:h-0.5 before:bg-primary hover:before:w-full before:transition-all before:duration-300 before:left-0 before:-bottom-1 ${
                    isActive ? "before:w-full font-semibold" : ""
                  }`
                }
                to="/Categories"
              >
                Categories
              </NavLink>
            </li>

            {token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:content-[''] before:absolute before:w-0 before:h-0.5 before:bg-primary hover:before:w-full before:transition-all before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/Products"
                  >
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:content-[''] before:absolute before:w-0 before:h-0.5 before:bg-primary hover:before:w-full before:transition-all before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:content-[''] before:absolute before:w-0 before:h-0.5 before:bg-primary hover:before:w-full before:transition-all before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/Orders"
                  >
                    Orders
                  </NavLink>
                </li> */}
              </>
            )}
          </ul>

          {/* CART & SPINNER  */}
          {token && (
            <>
              <div className="cart relative curser-pointer ml-auto py-4 cursor-pointer">
                <Link to={"/Cart"}>
                  <i className="fa-xl py-4 fa-solid fa-cart-shopping text-2xl relative "></i>
                </Link>
                <div>
                  <span className="cart-counter flex justify-center items-center absolute right-0 top-0 h-5 w-5 rounded-2xl bg-primary text-white">
                    {cartInfo?.numOfCartItems}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* UL SOCIAL MEDIA */}
          <ul className="flex gap-5">
            <li>
              <a href="https://instgram.com" target="_blank">
                <i className="fa-brands fa-instgram"></i>
              </a>
            </li>

            <li>
              <a href="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>

          {/* UL LOGIN SIGNUP LOGOUT */}
          <ul className="flex gap-5 items-center">
            {!token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/Signup"
                  >
                    Sign up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/Login"
                  >
                    Log in
                  </NavLink>
                </li>
              </>
            )}

            {token && (
              <>
                <li onClick={logOut}>
                  <Link to={"/Login"}>
                    <i className="fa-solid fa-right-from-bracket text-lg"></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
