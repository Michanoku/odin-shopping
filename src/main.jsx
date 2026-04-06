import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./css/index.css";
import Root from "./routes/root.jsx";
import ErrorPage from "./routes/error-page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <div>This is the index.</div> },
      {
        path: "shop/",
        element: <div>This is the shop.</div>,
      },
      {
        path: "shop/:category/",
        element: <div>This is the category shop.</div>,
      },
      {
        path: "cart/",
        element: <div>This is the cart.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);