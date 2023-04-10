import React from "react";
import VerticalMenu from "../../../components/VerticalMenu/VerticalMenu";
import { BASE_URL_USER } from "../../../utils/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";
import warning from "../../../assets/warning.png";

const DeleteAdmin = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (isAdmin === "false") {
      navigate("/403");
    }
  }, [isAdmin]);

  const handleRemoveAdmin = (id) => {
    fetch(`${BASE_URL_USER}/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (isAdmin && userId == id) {
          // xử lý xóa admin
          localStorage.setItem("accessToken", "");
          localStorage.setItem("userId", "");
          localStorage.setItem("isAdmin", "");
          navigate(`/login`);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <VerticalMenu />

      <div className="delete-admin">
        <img src={warning} alt="img-warning" />
        <p>
          Bạn là admin và bạn đang muốn xóa chính mình. Bạn sẽ mất toàn quyền
          admin.
        </p>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <button id="close" className="btn btn-success">
            Close
          </button>
        </Link>
        <button
          id="delete"
          onClick={() => handleRemoveAdmin(userId)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteAdmin;
