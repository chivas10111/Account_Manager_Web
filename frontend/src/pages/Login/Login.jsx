import React from "react";
import { Input, Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { BASE_URL_AUTH } from "../../utils/api";
import { useCallback } from "react";

const Login = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogIn = useCallback(
    (value) => {
      fetch(`${BASE_URL_AUTH}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            localStorage.setItem("accessToken", data?.accessToken);
            localStorage.setItem("userId", data?._id);
            localStorage.setItem("isAdmin", data?.isAdmin);
            if (data.isAdmin) {
              navigate(`/`);
            }
            if (!data.isAdmin && data.isAdmin == undefined) {
              message.error(`Bạn nhập sai username hoặc password`);
            }
            if (!data.isAdmin && data.isAdmin != undefined) {
              navigate(`/user/${localStorage.getItem("userId")}`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [navigate]
  );

  return (
    <div className="login-page">
      <h2>Login to your account</h2>
      <br />
      <Form
        className="login-form"
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
        onFinish={handleLogIn}
        autoComplete="off"
      >
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
          <Input placeholder="Type your username" />
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
          <Input.Password placeholder="Type your password" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" child id="btn-login">
            Log In
          </Button>
          <Link to={`/sign-up`} style={{ textDecoration: "none" }}>
            <Button type="primary" htmlType="submit" id="btn-signup">
              Create new user
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
