import { Dispatch, SetStateAction } from "react";

export interface MenusProps {
  isShow: boolean;
  currentMenu: string;
  setCurrentMenu: Dispatch<SetStateAction<string>>;
}