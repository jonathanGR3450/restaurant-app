import { AdminLayout } from "../layouts/AdminLayout";
import { LoginAdmin } from "../pages/Admin";
import { Error404 } from "../pages/Error404";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: LoginAdmin,
  },
];

export default routesAdmin;
