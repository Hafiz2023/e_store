import { LayoutDashboard, ShoppingBag, Users, Package, Image } from "lucide-react";

export const adminAppSidebarMenu = [
  {
    title: "Dashboard",
    url: "/admin/Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/admin/Dashboard/products",
    icon: ShoppingBag,
    submenu: [
      {
        title: "All Products",
        url: "/admin/Dashboard/products",
      },
      {
        title: "Add Product",
        url: "/admin/Dashboard/products/add",
      },
    ],
  },
  {
    title: "Orders",
    url: "/admin/Dashboard/orders",
    icon: Package,
  },
  {
    title: "Users",
    url: "/admin/Dashboard/users",
    icon: Users,
  },
  {
    title: "Media",
    url: "/admin/Dashboard/media",
    icon: Image,
  },
];
