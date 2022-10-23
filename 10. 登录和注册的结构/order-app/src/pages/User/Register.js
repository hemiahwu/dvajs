import React from "react";
import { Form, Input, Button } from "antd";
import Logo from "Assets/icon.png";
import style from "./account.scss";

export default function Register() {
  return (
    <div className={style.account}>
      <img src={Logo} className={style.logo} />
      <Form className="account-form">
        <Form.Item label="邮箱">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="密码">
          <Input type="password" />
        </Form.Item>
        <Form.Item label="确认密码">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button className="btn" type="primary">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
