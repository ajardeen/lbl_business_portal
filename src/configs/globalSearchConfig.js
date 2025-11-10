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
  {
    searchName: "Home",
    link: "/",
    icon: Home,
  },
  {
    searchName: "Report",
    link: "/reports",
    icon: FileText,
  },
//   {
//     searchName: "Settings",
//     link: "/settings",
//     icon: Settings,
//   },
];

export const pagesSearch = [
  {
    searchName: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    searchName: "Reports",
    link: "/reports",
    icon: BarChart,
  },
  {
    searchName: "Quick Access",
    link: "/quick-access",
    icon: FolderOpen,
  },
  {
    searchName: "Management",
    link: "/management",
    icon: FileText,
  },
  {
    searchName: "Documents",
    link: "/documents",
    icon: FileText,
  },
  {
    searchName: "Settings",
    link: "/settings",
    icon: Settings,
  },
  {
    searchName: "Help",
    link: "/help",
    icon: HelpCircle,
  },
];
