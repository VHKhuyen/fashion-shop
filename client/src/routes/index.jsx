import { createBrowserRouter } from "react-router-dom";
import { requestShop } from "../utils/httpRequest";

import Main from "../layouts/Main";
import {
  Login,
  Register,
  Home,
  Products,
  ProductPage,
  StoreLocation,
  Contact,
  CartPage,
  Wishlist,
  ErrorPage,
} from "../pages";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        loader: async ({ params }) =>
          await requestShop.get(
            `http://localhost:8000/api/v1/products/${params.id}`
          ),

        element: <ProductPage />,
      },

      {
        path: "/stores",
        element: <StoreLocation />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/wish-list",
        element: <Wishlist />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
