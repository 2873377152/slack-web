import { Dispatch, SetStateAction } from "react";

export interface LoginProps {
  setCurrentMenu: Dispatch<SetStateAction<string>>;
  setIsShowLogin: Dispatch<SetStateAction<boolean>>;
}

export interface VerifyCodeLoginProps {
  setCurrentMenu: Dispatch<SetStateAction<string>>;
  setIsShowLogin: Dispatch<SetStateAction<boolean>>;
}

export interface AccountLoginProps {
  setCurrentMenu: Dispatch<SetStateAction<string>>;
  setIsShowLogin: Dispatch<SetStateAction<boolean>>;
}