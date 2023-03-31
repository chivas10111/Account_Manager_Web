import React, { useEffect, useState } from "react";
import { BASE_URL_USER, BASE_URL_AUTH } from "../../../utils/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";

const User = () => {
  const [userCurrent, setUserCurrent] = useState({});
  const path = `user/${localStorage.getItem("userId")}`;
  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();

  const handleGetUser = async () => {
    fetch(`${BASE_URL_USER}/${localStorage.getItem("userId")}`, {
      headers: { token: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserCurrent(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetUser();
  }, [localStorage.getItem("userId")]);

  const handleRemoveUser = (id) => {
    fetch(`${BASE_URL_USER}/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(`Bạn đã xóa tài khoản user của bạn`);
        if (isAdmin && localStorage.getItem("userId") == id) {
          localStorage.setItem("accessToken", "");
          localStorage.setItem("userId", "");
          localStorage.setItem("isAdmin", "");
          navigate(`/login`);
        }
      })
      .catch((error) => console.log(error));
  };

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
      <div className="user-page">
        <div className="profile">
          <h1>My Account</h1>
          <h2>Email</h2>
          <p>{userCurrent.email}</p>
          <h2>Username</h2>
          <p>{userCurrent.username}</p>
          <Link
            to={`/user/update/${localStorage.getItem("userId")}`}
            style={{ marginRight: "1rem" }}
          >
            <button className="btn btn-warning">Edit account</button>
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleRemoveUser(localStorage.getItem("userId"))}
          >
            Remove account
          </button>
        </div>
        <div className="nav-profile">
          <ul>
            <li>Welcome:&nbsp;&nbsp;&nbsp; {userCurrent.username}</li>
            <li>
              <button onClick={handleLogout} className="btn btn-danger">
                <i className="fa-solid fa-power-off"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default User;
