import React, { useEffect, useState } from "react";
import Forbidden from "../../pages/Error/403";

const ProtectedAdmin = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");
  return <div>{isAdmin ? children : <Forbidden />}</div>;
};

export default ProtectedAdmin;
