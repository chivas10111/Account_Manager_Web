import React from "react";
import "./index.css";
import { useEffect, useState } from "react";
import VerticalMenu from "../../../components/VerticalMenu/VerticalMenu";
import { headers } from "../../../utils/headers";
import { BASE_URL_AUTH, BASE_URL_USER } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import Forbidden from "../../Error/403";

const dataUrl = `http://localhost:8000/v1/user/`;

const HomePage = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    if (isAdmin === "false") {
      navigate("/403");
    }
  }, [isAdmin]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleGetAllUser = () => {
    setLoading(true);
    fetch(dataUrl, { headers })
      .then((res) => res.json())
      .then((res) => {
        const userArr = res.filter((item) => item.isAdmin == false);
        setData(userArr);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetAllUser();
  }, []);

  // delete
  const handleRemoveUser = (userId) => {
    console.log(userId);
    fetch(`${BASE_URL_USER}/${userId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(`Bạn đã xóa ra khỏi danh sách user`);
        setData(data.filter((user) => user._id !== userId));
      })
      .catch((error) => console.log(error));
  };

  // log out
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
      .catch((error) => console.log(error));
  };
  if (!isAdmin) return <Forbidden />;

  return (
    <>
      <div className="list-user">
        <VerticalMenu />
        <div id="header">
          <ul>
            <li>Welcome:&nbsp;&nbsp;&nbsp; admin</li>
            <li>
              <button onClick={handleLogout} className="btn btn-danger">
                <i className="fa-solid fa-power-off"></i> Logout
              </button>
            </li>
          </ul>
        </div>
        <table className="demo-loadmore-list">
          <thead>
            <tr>
              <th style={{ padding: 9 }}>Username</th>
              <th style={{ paddingRight: 136 }}>Email</th>
              <th style={{ paddingRight: 10 }}>Admin</th>
              <th style={{ paddingRight: 53 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin.toString()}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveUser(user._id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default HomePage;
