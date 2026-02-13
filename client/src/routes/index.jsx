import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Default from "@/layouts/Default";
import Game from "@/pages/Game";
import Images from "@/pages/Images";
import Objects from "@/pages/Objects";
const routes = [
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
  {
    path: "/",
    element: <Default />,
    children: [
      { index: true, element: <Game /> },
      { path: "images", element: <Images /> },
      { path: "images/:id/objects", element: <Objects /> },
    ],
  },
];

export default createBrowserRouter(routes);
