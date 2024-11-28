import React from 'react'
import ErrorPage from "../components/ErrorPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Public from "../components/Auth/Public";
import Protected from "../components/Auth/Protected";
import { createBrowserRouter } from 'react-router-dom';
import App from "../App"
import Todo from '../pages/Todo';

 const Routers = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: (
            <Public>
              <Login />
            </Public>
          ),
        },
        {
          path: "/login",
          element: (
            <Public>
              <Login />
            </Public>
          ),
        },
        {
          path: "/signup",
          element: (
            <Public>
              <SignUp />
            </Public>
          ),
        },
        {
          path: "/home",
          element: (
            <Protected>
              <Home />
              </Protected>
          ),
        },
        {
          path: "/about",
          element: (
            <Protected>
              <About />
              </Protected>
          ),
        },
        {
          path: "/contact",
          element: (
            <Protected>
              <ContactUs />
            </Protected>
          ),
        },
        {
          path: "/todo-app",
          element: (
            <Protected>
              <Todo />
            </Protected>
          ),
        },
      ],
    },
  ]);

  export default Routers;