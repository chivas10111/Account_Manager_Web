import React from "react";
import "./index.css";
import { useEffect, useState } from "react";
import VerticalMenu from "../../../components/VerticalMenu/VerticalMenu";
import { headers } from "../../../utils/headers";
import { BASE_URL_USER } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { message, Table, Space, Modal, Input } from "antd";
import { changeFormatDate } from "../../../utils/formatDate";

const { Search } = Input;
const dataUrl = `http://localhost:8000/v1/user/`;

const HomePage = () => {
  const bottom = "bottomRight";
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    if (isAdmin === "false") {
      navigate("/403");
    }
  }, [isAdmin]);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleGetAllUser = () => {
    setLoading(true);
    fetch(dataUrl, { headers })
      .then((res) => res.json())
      .then((response) => {
        const userArr = response.filter((item) => item.isAdmin == false);
        setUsers(userArr);
        setLoading(false);
      })

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetAllUser();
  }, []);

  // delete
  const handleRemoveUser = (record) => {
    const userID = record._id;
    Modal.confirm({
      title: "Are you sure, You want to delete this user ?",
      onOk: () => {
        fetch(`${BASE_URL_USER}/${userID}/delete`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((response) => response.json())
          .then(() => {
            setUsers(users.filter((user) => user._id !== userID));
            message.success("Bạn đã xóa người dùng ra khỏi danh sách user");
          })
          .catch((error) => console.log(error));
      },
    });
  };

  // search user
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="list-user">
        <VerticalMenu />
        <Space className="space-search p-2">
          <Search
            className="search-input"
            placeholder="Search by username or email"
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: 600,
            }}
          />
        </Space>
        <div className="container-data2 p-3">
          <Table
            style={{ height: "500px" }}
            loading={loading}
            columns={[
              {
                title: "USERNAME",
                dataIndex: "username",
                key: "username",
              },
              {
                title: "EMAIL",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "CREATED AT",
                key: "createdAt",
                render: (record) => {
                  return <p>{changeFormatDate(record.createdAt)}</p>;
                },
              },
              {
                title: "ACTION",
                key: "x",
                render: (record) => {
                  return (
                    <Space>
                      <button
                        onClick={() => handleRemoveUser(record)}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    </Space>
                  );
                },
              },
            ]}
            dataSource={filteredUsers}
            pagination={{
              pageSize: 6,
              position: [bottom],
            }}
            tableLayout="fixed"
          ></Table>
        </div>
      </div>
    </>
  );
};
export default HomePage;
