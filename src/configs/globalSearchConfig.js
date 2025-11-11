import {
  Home,
  FileText,
  Settings,
  BarChart,
  HelpCircle,
  LayoutDashboard,
  FolderOpen,
} from "lucide-react";
import { SiGoogleadsense } from "react-icons/si";

export const suggestedSearch = [
  {
    searchName: "Leads",
    link: "/leads",
    icon: SiGoogleadsense,
  }, 
 
];

export const pagesSearch = [
  {
    searchName: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  //  {
  //   searchName: "Leads",
  //   link: "/Leads",
  //   icon: SiGoogleadsense,
  // }, 
  {
    searchName: "Settings",
    link: "/settings",
    icon: Settings,
  },
  // {
  //   searchName: "Reports",
  //   link: "/reports",
  //   icon: BarChart,
  // },
  // {
  //   searchName: "Quick Access",
  //   link: "/quick-access",
  //   icon: FolderOpen,
  // },
  // {
  //   searchName: "Management",
  //   link: "/management",
  //   icon: FileText,
  // },
  // {
  //   searchName: "Documents",
  //   link: "/documents",
  //   icon: FileText,
  // },
 
  // {
  //   searchName: "Help",
  //   link: "/help",
  //   icon: HelpCircle,
  // },
];
