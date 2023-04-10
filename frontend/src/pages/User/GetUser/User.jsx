import React, { useEffect, useState } from "react";
import { BASE_URL_USER, BASE_URL_AUTH } from "../../../utils/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import "./index.css";

const User = () => {
  const [userCurrent, setUserCurrent] = useState({});
  const isAdmin = localStorage.getItem("isAdmin");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleGetUser = async () => {
    fetch(`${BASE_URL_USER}/${userId}`, {
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
  }, [userId]);

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
        message.success(`Bạn đã xóa tài khoản user của bạn`);
        if (isAdmin && userId == id) {
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
          <Link to={`/user/update/${userId}`} style={{ marginRight: "1rem" }}>
            <button className="btn btn-warning">Edit account</button>
          </Link>
          <Popconfirm
            title="Delete user"
            description="Are you sure to remove your account?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleRemoveUser(userId)}
            icon={<WarningOutlined style={{ color: "red" }} />}
          >
            <button className="btn btn-danger">Remove account</button>
          </Popconfirm>
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
