import { AdminLayout } from "../layouts/AdminLayout";
import {
  CategoriesAdmin,
  HistoryPaymentsAdmin,
  HomeAdmin,
  LoginAdmin,
  ProductsAdmin,
  TablesAdmin,
  UsersAdmin,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: HomeAdmin,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UsersAdmin,
  },
  {
    path: "/admin/tables",
    layout: AdminLayout,
    component: TablesAdmin,
  },
  {
    path: "/admin/payments-history",
    layout: AdminLayout,
    component: HistoryPaymentsAdmin,
  },
  {
    path: "/admin/categories",
    layout: AdminLayout,
    component: CategoriesAdmin,
  },
  {
    path: "/admin/products",
    layout: AdminLayout,
    component: ProductsAdmin,
  },
];

export default routesAdmin;
