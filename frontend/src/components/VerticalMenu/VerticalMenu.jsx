import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL_AUTH } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { useState } from "react";
import "./index.css";

const { Title } = Typography;

const VerticalMenu = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    fetch(`${BASE_URL_AUTH}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("userId", "");
        localStorage.setItem("isAdmin", "");
        navigate(`/login`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="menu">
        <ul className="categories list-unstyled">
          <li>
            <div className="logo">
                  <Title style={{color: "white",textAlign:'center',padding:'15px',display: collapsed ? "none" : "block"}} level={4}>Welcome Admin</Title>        
              </div>
          </li>
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
          <li>
            <i className="fa-solid fa-right-from-bracket"></i>
            <button onClick={handleLogout} style={{background: "none", border: "none", color: "white"}}>
                Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VerticalMenu;
