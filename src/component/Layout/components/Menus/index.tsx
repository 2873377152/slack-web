import React, { useEffect } from "react";
import "./index.less";
import Logo from "images/slack_logo.png";
import router from "@/router";
import { MenusProps } from "../../types/props";
import { useLocation, useNavigate } from "react-router-dom";

const Menus = (props: MenusProps) => {
  const { isShow, currentMenu, setCurrentMenu } = props;

  const menusList = router.filter((i) => i.id !== "root");

  const navigate = useNavigate();

  const onSelectMenu = (id: string, path: string) => {
    setCurrentMenu(id);
    navigate(path);
  };

  const location = useLocation();

  useEffect(() => {
    // 获取pathname
    const pathname = location.pathname;
    // 使用split('/')将pathname分割成数组，然后使用pop()获取数组的最后一项
    const lastSegment = pathname.split("/").pop() || "";
    setCurrentMenu(lastSegment);
  }, []);

  return (
    <div
      className="slack_menus"
      style={{ width: `${isShow ? "160px" : "0px"}` }}
    >
      <div className="slack_logo">
        <img src={Logo} alt="" />
        Slack
      </div>
      <div className="slack_menus_content">
        {menusList.map((route) => {
          if (!route.disable) {
            return (
              <div
                key={route.path}
                className="slack_menu_item"
                onClick={() => onSelectMenu(route.id, route.path)}
                style={{
                  backgroundImage:
                    currentMenu === route.id
                      ? "linear-gradient(to right top, #d3fbf0, #fff)"
                      : "",
                }}
              >
                {route.name}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Menus;
