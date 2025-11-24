import {
  Home,
  FileText,
  Settings,
  BarChart,
  HelpCircle,
  LayoutDashboard,
  FolderOpen,
} from "lucide-react";

export const suggestedSearch = [
  // {
  //   searchName: "Leads",
  //   link: "/leads",
  //   icon: SiGoogleadsense,
  // }, 
 
];

export const pagesSearch = [
  {
    searchName: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    searchName: "Settings",
    link: "/settings",
    icon: Settings,
  },
  {
    searchName: "Menu Master",
    link: "/master/menus",
    icon: BarChart,
  },
  {
    searchName: "Category Master",
    link: "/master/category",
    icon: FolderOpen,
  },
  {
    searchName: "Item Master",
    link: "/master/items",
    icon: FileText,
  },

];
