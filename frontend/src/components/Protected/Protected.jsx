import React from "react";
import Login from "../../pages/Login/Login";

const Protected = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return <div>{token ? children : <Login />}</div>;
};

export default Protected;
