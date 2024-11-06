import React from "react";
import { Button, Form, FormProps, Input } from "antd";
import { postVCode } from "../services";
import { useNavigate } from "react-router-dom";
import { VerifyCodeLoginProps } from "../type";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const VerifyCodeLogin = (props: VerifyCodeLoginProps) => {
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

  const handleSendVCode = () => {
    postVCode({ mobile: "17603482541", type: 1 }).then((res) => {
      console.log(res, "------- res --------");
    });
  };

  return (
    <div className="login_verify_code">
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
          rules={[{ required: true, message: "请输入手机号！" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="verify_code"
          label="验证码"
          style={{ marginBottom: 0 }}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入验证码！" }]}
            style={{
              display: "inline-block",
              width: "calc(100% - 120px)",
              marginRight: "16px",
            }}
          >
            <Input />
          </Form.Item>
          <Button onClick={handleSendVCode}>发送验证码</Button>
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

export default VerifyCodeLogin;
