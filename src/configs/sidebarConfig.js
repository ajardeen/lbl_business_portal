import { Home, Settings, BarChart } from "lucide-react";
import { SiGoogleadsense } from "react-icons/si";
import { GoHomeFill } from "react-icons/go";
import { RiSettings3Fill } from "react-icons/ri"

export const sidebarConfig = [
  {
    groupTitle: "Home",
    menus: [
      {
        menuTitle: "Dashboard",
        icon: GoHomeFill,
        url: "/dashboard",
        // submenu: [
        //   { submenuTitle: "Overview", url: "/dashboard/overview" },
        //   { submenuTitle: "Stats", url: "/dashboard/stats" },
        // ],
      },
      {
        menuTitle: "Leads",
        icon: SiGoogleadsense,
        url: "/leads",
        // submenu: [
        //   { submenuTitle: "Sales", url: "/reports/sales" },
        //   { submenuTitle: "Customers", url: "/reports/customers" },
        // ],
      },
      
    ],
  },
  {
    groupTitle: "Others",
    menus: [
      {
        menuTitle: "Settings",
        icon: RiSettings3Fill,
        url: "/settings",
        // submenu: [
        //   { submenuTitle: "Profile", url: "/settings/profile" },
        //   { submenuTitle: "Billing", url: "/settings/billing" },
        // ],
      },
    ],
  },
 
];


// 🧠 Dynamic header configuration
export const sidebarHeaderConfig = {
  title: "Vision Action",
  options: [
    // one option is static if more it become dropdown
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ],
};