import React from "react";
import { BASE_URL_USER } from "../../../utils/api";
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { message } from "antd";
import "./index.css";

const UpdateUser = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [newData, setNewData] = useState(null);
  const userId = localStorage.getItem("userId"); 

  const navigate = useNavigate();

  // get current user
  const handleGetCurrentUser = () => {
    fetch(`${BASE_URL_USER}/${userId}`, {
      headers: { token: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [userId]);

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = (e) => {
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
        navigate(`/user/${userId}`);
      })
      .catch((error) => {
        message.error(`Update không thành công`);
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleUpdateUser} className="form-update">
      <h1>Update My Account</h1>
      <h2>Email</h2>
      <input
        placeholder="email"
        defaultValue={currentUser.email}
        name="email"
        onChange={handleChange}
      />
      <br />
      <h2>Username</h2>
      <input
        placeholder="username"
        defaultValue={currentUser.username}
        name="username"
        onChange={handleChange}
      />
      <br />
      <button className="btn btn-warning">Update</button>
    </form>
  );
};

export default UpdateUser;
