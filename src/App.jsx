import "./App.css";
import Home from "./components/Home/Home";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import SignUp from "./components/Signup/Signup";
import { Toaster } from "react-hot-toast";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Loading from "./components/Loading/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Ordrers/Orders";
import Online from "./components/Online/Online";
import Offline from "./components/Offline/Offline";

let query = new QueryClient();

let routes = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id", // go to ProductDetails
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <Notfound /> },
    ],
  },
  {},
]);

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <CartContextProvider>
            <RouterProvider router={routes}></RouterProvider>
            <ReactQueryDevtools />
            <Toaster />
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>

      <Offline>
        <div className="p-4 rounded-lg shadow fixed right-8 bottom-8 z-99 bg-gray-200 text-gray-600 font-semibold">
          <i className="fa-solid fa-wifi mr-2"></i>
          <span>Check Your Internet Conection</span>
        </div>
      </Offline>
    </>
  );
}

export default App;
