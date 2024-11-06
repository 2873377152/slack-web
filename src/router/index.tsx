import { Navigate } from "react-router-dom";
import Popular from "@/pages/Popular";
import Register from "@/component/Register";

const router = [
  {
    id: "root",
    path: "/",
    name: "根",
    element: <Navigate to="/popular" />,
  },
  {
    id: "register",
    disable: true,
    path: "/",
    name: "注册",
    element: <Register />,
  },
  {
    id: "popular",
    path: "/popular",
    name: "热门",
    element: <Popular />,
  },
  {
    id: "gossip",
    path: "/gossip",
    name: "职场八卦",
    element: <>职场八卦</>,
  },
  {
    id: "ground",
    path: "/ground",
    name: "广场",
    element: <>广场</>,
  },
  {
    id: "recommend",
    path: "/recommend",
    name: "推荐",
    element: <>推荐</>,
  },
];

export default router;
