import React from "react";
import { Input, Button, Form } from "antd";
import VerticalMenu from "../../../components/VerticalMenu/VerticalMenu";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AddUser = () => {
  const navigate = useNavigate();

  const handleAddUser = (value) => {
    fetch(`http://localhost:8000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Bạn đã thêm user thành công");
        navigate("/");
      })
      .catch((err) => {
        alert("Bạn thêm user không thành công");
        console.log(err);
      });
  };
  return (
    <>
      <VerticalMenu />
      <div className="add-user">
        <h2>Add User</h2>
        <br />
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleAddUser}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddUser;
