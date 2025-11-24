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
        menuTitle: "Leads",
        icon: ChartSpline,
        url: "/leads",
        // submenu: [
        //   { submenuTitle: "Sales", url: "/reports/sales" },
        //   { submenuTitle: "Customers", url: "/reports/customers" },
        // ],
      },
      {
        menuTitle: "Master",
        icon: Pen,
        url: "/master",
        submenu: [
          { submenuTitle: "Category", url: "/master/category" },
          { submenuTitle: "Items", url: "/master/items" },
          { submenuTitle: "Menu", url: "/master/menus" },
          { submenuTitle: "Bundles", url: "/master/bundles" },
        ],
      },
    ],
  },
];

