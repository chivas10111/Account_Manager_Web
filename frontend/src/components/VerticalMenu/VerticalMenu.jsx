import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const VerticalMenu = () => {
  return (
    <>
      <div className="menu">
        <ul className="categories list-unstyled">
          <li>
            <i className="fa-solid fa-house fa-fw"></i>
            <Link to={`/`} style={{ textDecoration: "none", color: "white" }}>
              {" "}
              Dashboard
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-wrench fa-fw"></i>
            <Link
              to={`/update-admin`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              Update Admin
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-user-slash"></i>
            <Link
              to={`/delete-admin`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              Delete Admin
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-user-plus"></i>
            <Link
              to={`/add-user`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              Add User
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VerticalMenu;
