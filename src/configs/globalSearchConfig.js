import {
  Settings,
  FileBox,
  Box,
  LayoutTemplate,
  FilePenLine,
  ChartSpline,
  Home,
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
    icon: Home,
  },
  {
    searchName: "Leads",
    link: "/leads",
    icon: ChartSpline,
  },
  {
    searchName: "Settings",
    link: "/settings",
    icon: Settings,
  },
  {
    searchName: "Menu Master",
    link: "/master/menus",
    icon: FilePenLine,
  },
  {
    searchName: "Category Master",
    link: "/master/category",
    icon: LayoutTemplate,
  },
  {
    searchName: "Item Master",
    link: "/master/items",
    icon: Box,
  },
  {
    searchName: "Bundle Master",
    link: "/master/bundles",
    icon: FileBox,
  },
];
