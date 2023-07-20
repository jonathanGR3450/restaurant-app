import { BasicLayout } from "../layouts";
import { Error404 } from "../pages/Error404";
import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";

const routes = [
  ...routesAdmin,
  ...routesClient,
  {
    path: "*",
    layout: BasicLayout,
    component: Error404,
  },
];

export default routes;
