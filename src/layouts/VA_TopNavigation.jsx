import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import VA_GlobalSearchModel from "@/components/VAComponents/VA_GlobalSearchModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, CreditCard, Bell, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Sample global search config imports ---
import { suggestedSearch, pagesSearch } from "@/configs/globalSearchConfig.js";
import VA_Breadcrumb from "@/components/VAComponents/VA_Breadcrumb";
import { signOut } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { useNavigate } from "react-router-dom";
import VA_ThemeToggle from "@/components/VAComponents/VA_ThemeToggle";
import VA_NetworkStatusBadge from "@/components/VAComponents/VA_NetworkStatusBadge";
export default function VA_TopNavigation() {
  const navigate = useNavigate();
  const [name, setName] = useState("admin");
  const [email, setEmail] = useState("admin@example.com");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name);
      setEmail(user.email);
    }
  }, []);
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleDropdownNavigation = (url) => {
    navigate(url);
  };

  return (
    <nav className="sticky w-full top-0 z-50 flex items-center justify-between border-b bg-background px-4 py-2">
      {/* ✅ Left section: Sidebar trigger + Breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <SidebarTrigger className="" />
        <Separator
          orientation="vertical"
          className="mr-1 data-[orientation=vertical]:h-4"
        />

        {/* ✅ Dynamic Breadcrumb */}

        <VA_Breadcrumb />
      </div>

      {/* ✅ Right side tools */}
      <div className="flex items-center gap-3">
        {/* Global Search */}
        <VA_GlobalSearchModel
          suggestedSearch={suggestedSearch}
          pagesSearch={pagesSearch}
        />


        <VA_ThemeToggle/>
        <VA_NetworkStatusBadge/>
        {/* 👤 Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-full"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src="./images/profilepic.webp" alt={name} />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="w-56 rounded-lg"
          >
            {/* Header */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-3 py-2 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="./images/profilepic.webp" alt={name} />
                  <AvatarFallback className="rounded-lg">AC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="truncate font-medium">{name}</span>
                  <span className="text-muted-foreground text-xs truncate">
                    {email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Main Actions */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="h-4 w-4" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDropdownNavigation("/settings")}
              >
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* 🚪 Styled Logout */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 dark:text-red-500 font-medium cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-red-600 dark:text-red-500" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
