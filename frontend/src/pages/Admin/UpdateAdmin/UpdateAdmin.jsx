import React from "react";
import VerticalMenu from "../../../components/VerticalMenu/VerticalMenu";
import { BASE_URL_USER } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { message } from "antd";
import "./index.css";

const UpdateAdmin = () => {
  const [admin, setAdmin] = useState({});
  const [newData, setNewData] = useState(null);

  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (isAdmin === "false") {
      navigate("/403");
    }
  }, [isAdmin]);

  // get admin
  const handleGetAdmin = () => {
    fetch(`${BASE_URL_USER}/${userId}`, {
      headers: { token: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setAdmin(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetAdmin();
  }, [userId]);

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateAdmin = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL_USER}/${userId}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((res) => {
        message.success(`Update thành công`);
        localStorage.setItem("accessToken", "");
        localStorage.setItem("userId", "");
        localStorage.setItem("isAdmin", "");
        navigate(`/login`);
      })
      .catch((error) => {
        message.error(`Update không thành công`);
        console.log(error);
      });
  };
  return (
    <>
      <VerticalMenu />
      <div className="form-update-admin">
        <form onSubmit={handleUpdateAdmin}>
          <h1>Update Admin Account</h1>
          <h2>Email</h2>
          <input
            placeholder="email"
            defaultValue={admin.email}
            name="email"
            onChange={handleChange}
          />
          <br /> <br />
          <h2>Username</h2>
          <input
            placeholder="username"
            defaultValue={admin.username}
            name="username"
            onChange={handleChange}
          />
          <br /> <br />
          <button className="btn btn-warning">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdateAdmin;
