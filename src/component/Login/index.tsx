import React from "react";
import { LoginProps } from "./type";
import { CloseOutlined } from "@ant-design/icons";
import Logo from "images/slack_logo.png";
import "./index.less";
import { Tabs } from "antd";
import { FileProtectOutlined, MobileOutlined } from "@ant-design/icons";
import AccountLogin from "./components/AccountLogin";
import VerifyCodeLogin from "./components/VerifyCodeLogin";

const Login = (props: LoginProps) => {
  const { setCurrentMenu, setIsShowLogin } = props;

  const tabsConfig = [
    {
      // id: 1,
      key: "1",
      label: "账号密码登录",
      icon: <FileProtectOutlined />,
      children: (
        <AccountLogin
          setCurrentMenu={setCurrentMenu}
          setIsShowLogin={setIsShowLogin}
        />
      ),
    },
    {
      // id: 2,
      key: "2",
      label: "验证码登录",
      icon: <MobileOutlined />,
      children: (
        <VerifyCodeLogin
          setCurrentMenu={setCurrentMenu}
          setIsShowLogin={setIsShowLogin}
        />
      ),
    },
  ];

  const onCloseLogin = () => {
    setIsShowLogin(false);
  };

  return (
    <div className="slack_login_page" onClick={onCloseLogin}>
      <div className="login_panel" onClick={(e) => e.stopPropagation()}>
        <CloseOutlined className="login_panel_close" onClick={onCloseLogin} />
        <div className="login_title_logo">
          <img src={Logo} alt="" />
          Slack
        </div>
        <div className="login_panel_tabs">
          <Tabs size="large" items={tabsConfig} />
        </div>
      </div>
    </div>
  );
};
export default Login;
