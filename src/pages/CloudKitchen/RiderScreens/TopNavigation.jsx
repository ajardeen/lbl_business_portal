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
import { User, LogOut, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import VA_ThemeToggle from "@/components/VAComponents/VA_ThemeToggle";

export default function TopNavigation() {
  const { account, logout } = useAuth();

  const navigate = useNavigate();
  const [name, setName] = useState("admin");
  const [email, setEmail] = useState("admin@example.com");
  useEffect(() => {
    if (account) {
      setName(account.name);
      setEmail(account.email);
    }
  }, [account]);
  const handleLogout = async () => {
    logout();
  };
  const handleDropdownNavigation = (url) => {
    navigate(url);
  };

  return (
    <nav className="sticky w-full top-0 z-50 flex items-center justify-end border-b bg-background px-4 py-2">
      {/* ✅ Right side tools */}
      <div className="flex items-center gap-3">
        <VA_ThemeToggle/>
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
              <DropdownMenuItem
                onClick={() =>
                  handleDropdownNavigation("/cloud-kitchen/rider/profile")
                }
              >
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDropdownNavigation("/cloud-kitchen/rider")}
              >
                <PackageSearch className="h-4 w-4" />
                Orders
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
