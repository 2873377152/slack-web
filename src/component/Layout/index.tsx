import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./index.less";
import Menus from "./components/Menus";
import router from "@/router";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Button } from "antd";
import Login from "../Login";

const Layout = () => {
  const [currentMenu, setCurrentMenu] = useState(router[0].id);
  const [isShowLogin, setIsShowLogin] = useState(false);

  const onClickLogin = () => {
    setIsShowLogin(true);
  };

  const disableMenu = useCallback(() => {
    return router.filter((i) => i.disable).map((i) => i.id);
  }, [currentMenu]);

  return (
    <div
      className="slack_layout_page"
      style={{
        gap: `${disableMenu().includes(currentMenu) ? 0 : ""}`,
      }}
    >
      <Suspense fallback={<div></div>}>
        <Router>
          {/* 如果菜单被禁用，则不显示 */}
          <Menus
            isShow={!disableMenu().includes(currentMenu)}
            currentMenu={currentMenu}
            setCurrentMenu={setCurrentMenu}
          />
          <div
            className="slack_right"
            style={{
              maxWidth: `${
                disableMenu().includes(currentMenu)
                  ? "100%"
                  : "calc(100% - 176px)"
              }`,
            }}
          >
            {/* 如果菜单被禁用，则不显示 */}
            {!disableMenu().includes(currentMenu) && (
              <div className="slack_header">
                <div className="header_title"></div>
                <div className="header_login">
                  <Button onClick={onClickLogin}>登录</Button>
                </div>
              </div>
            )}
            <div className="slack_content">
              <Routes>
                {router.map((route) => {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  );
                })}
              </Routes>
            </div>
            {isShowLogin && (
              <Login
                setCurrentMenu={setCurrentMenu}
                setIsShowLogin={setIsShowLogin}
              />
            )}
          </div>
        </Router>
      </Suspense>
    </div>
  );
};
export default Layout;
