import { Home, Settings, BarChart, ChartSpline } from "lucide-react";

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
