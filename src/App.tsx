import React, { Suspense } from "react";
import "./App.less";
import Layout from "@/component/Layout";
import { UserProvider } from "./context/userContext";
import { message } from "antd";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className="App">
      {contextHolder}
      <UserProvider messageApi={messageApi}>
        <div className="slack_app_container">
          <Layout />
        </div>
      </UserProvider>
    </div>
  );
};

export default App;
