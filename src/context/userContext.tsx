import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { post } from "@/request";

interface UserContextValue {
  userInfo: any;
  token: string | null;
  updateUser: (newUserInfo: any, newToken: string) => void;
  loginOut: () => void;
  getUserInfo: (_token: string) => void;
  setToken: Dispatch<SetStateAction<string>>;
}

// 创建用户上下文
const UserContext = createContext<UserContextValue | undefined>(undefined);

// 用户提供者组件，包装整个应用，提供用户信息和 token
export const UserProvider: React.FC<{
  children: ReactNode;
  messageApi: any;
}> = ({ children, messageApi }) => {
  // 状态用于存储用户信息和 token
  const [userInfo, setUserInfo] = useState<any>(null);
  const [token, setToken] = useState<string>("");

  const getUserInfo = (_token: string) => {};

  useEffect(() => {
    const _token = window.localStorage.getItem("access_token") || token;
    if (_token) {
      setToken(_token);
      getUserInfo(_token);
    }
  }, []);

  window.addEventListener("storage", (e) => {
    if (e.key === "access_token") {
      const newToken = e.newValue;
      if (newToken && newToken !== token) {
        setToken(newToken);
      }
      // access_token 被移除
      if (newToken === null) {
        setToken("");
      }
    }
  });

  // 更新用户信息和 token 的函数
  const updateUser = (newUserInfo: any, newToken: string) => {
    setUserInfo(newUserInfo);
    setToken(newToken);
    window.localStorage.setItem("access_token", newToken);
  };

  const loginOut = () => {
    window.localStorage.removeItem("access_token");
    setUserInfo(null);
    setToken("");
  };

  // 将用户信息和 token 包装为上下文值
  const contextValue: UserContextValue = {
    userInfo,
    token,
    updateUser,
    loginOut,
    getUserInfo,
    setToken,
  };

  // 使用 UserContext.Provider 提供上下文值
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// 用于获取用户信息和 token
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
