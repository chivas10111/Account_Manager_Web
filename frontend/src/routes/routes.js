import React from "react";
import Forbidden from "../pages/Error/403";
import HomePage from "../pages/Admin/HomePage/HomePage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import User from "../pages/User/GetUser/User";
import UpdateUser from "../pages/User/UpdateUser/UpdateUser";
import UpdateAdmin from "../pages/Admin/UpdateAdmin/UpdateAdmin";
import DeleteAdmin from "../pages/Admin/DeleteAdmin/DeleteAdmin";
import Protected from "../components/Protected/Protected";
import ProtectedAdmin from "../components/Protected/ProtectedAdmin";
import AddUser from "../pages/Admin/AddUser/AddUser";

const public_routes = [
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/403",
    element: <Forbidden />,
  },
];

const admin_routes = [
  {
    path: "/",
    element: (
      <Protected>
        <ProtectedAdmin>
          <HomePage />
        </ProtectedAdmin>
      </Protected>
    ),
  },
  {
    path: "/update-admin",
    element: (
      <Protected>
        <ProtectedAdmin>
          <UpdateAdmin />
        </ProtectedAdmin>
      </Protected>
    ),
  },
  {
    path: "/delete-admin",
    element: (
      <Protected>
        <ProtectedAdmin>
          <DeleteAdmin />
        </ProtectedAdmin>
      </Protected>
    ),
  },
  {
    path: "/add-user",
    element: (
      <Protected>
        <ProtectedAdmin>
          <AddUser />
        </ProtectedAdmin>
      </Protected>
    ),
  },
];

const user_routes = [
  {
    path: "/user/:id",
    element: <User />,
  },
  {
    path: "/user/update/:id",
    element: <UpdateUser />,
  },
];

export default admin_routes;
export { public_routes, user_routes };
