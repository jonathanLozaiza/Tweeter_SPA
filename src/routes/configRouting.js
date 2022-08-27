import Home from "../page/Home";
import Error404 from "../page/Error404";

export default [
  { path: "/", element: Home },
  { path: "*", element: Error404 },
];
