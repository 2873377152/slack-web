import React from "react";
import { Button, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { AccountLoginProps } from "../type";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const AccountLogin = (props: AccountLoginProps) => {
  const { setCurrentMenu, setIsShowLogin } = props;

  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const goToRegister = () => {
    navigate("/register");
    setCurrentMenu("register");
    setIsShowLogin(false);
  };

  return (
    <div className="login_account">
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="账号"
          name="username"
          rules={[{ required: true, message: "请输入账号！" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码！" }]}
        >
          <Input.Password />
        </Form.Item>
        <span className="register_tip">
          还没有账号？快点击
          <span className="register_btn" onClick={goToRegister}>
            注册
          </span>
        </span>
        <Form.Item className="login_btn">
          <Button size="large" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountLogin;
