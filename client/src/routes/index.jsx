import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Default from "@/layouts/Default";
import Game from "@/pages/Game";
const routes = [
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
  {
    path: "/",
    element: <Default />,
    children: [{ index: true, element: <Game /> }],
  },
];

export default createBrowserRouter(routes);
