import { ClientLayout } from "../layouts/ClientLayout";
import { Home } from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: ClientLayout,
    component: Home,
  },
];

export default routesClient;
