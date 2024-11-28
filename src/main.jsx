import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";
import UserAuthContextProvider from "./context/userAuthContext";
import Routers from "./routes/Routers";

createRoot(document.getElementById("root")).render(
  <UserAuthContextProvider>
    <RouterProvider router={Routers} />
    <ToastContainer />
  </UserAuthContextProvider>
);
