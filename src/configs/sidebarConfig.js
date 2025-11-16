import { Home, ChartSpline, Pen } from "lucide-react";

export const sidebarConfig = [
  {
    groupTitle: "Home",
    menus: [
      {
        menuTitle: "Dashboard",
        icon: Home,
        url: "/dashboard",
        // submenu: [
        //   { submenuTitle: "Overview", url: "/dashboard/overview" },
        //   { submenuTitle: "Stats", url: "/dashboard/stats" },
        // ],
      },
      {
        menuTitle: "Master",
        icon: Pen,
        url: "/leads",
        submenu: [
          { submenuTitle: "Branch", url: "/master/branch" },
          { submenuTitle: "Category", url: "/master/category" },
          { submenuTitle: "Product", url: "/master/product" },
        ],
      },
      {
        menuTitle: "Leads",
        icon: ChartSpline,
        url: "/leads",
        // submenu: [
        //   { submenuTitle: "Sales", url: "/reports/sales" },
        //   { submenuTitle: "Customers", url: "/reports/customers" },
        // ],
      },
    ],
  },
];

// 🧠 Dynamic header configuration
export const sidebarHeaderConfig = {
  title: "Lunchbox Legends",
  options: [
    // one option is static if more it become dropdown
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ],
};
