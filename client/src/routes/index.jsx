import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];

export default createBrowserRouter(routes);
