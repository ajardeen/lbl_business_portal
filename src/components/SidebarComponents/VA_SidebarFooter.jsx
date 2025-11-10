"use client";

import React from "react";
import {
  Settings,
  MessageSquare,
  Sparkles,
  User,
  CreditCard,
  Bell,
  LogOut,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function VA_SidebarFooter() {
  const { open, isMobile } = useSidebar();

  // 🧍🏻‍♂️ Sample user data
  const user = {
    name: "Alex Carter",
    email: "alex.carter@example.com",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Alex",
  };

  return (
    <div className="w-full space-y-3 bg-sidebar pb-3">
   
   

      {/* 🌟 Upgrade Section */}
      <div className="px-3">
        {open ? (
          <Card className="border-none bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-sm py-1">
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/15 text-primary rounded-lg">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-sm font-medium leading-tight">
                  Upgrade to{" "}
                  <span className="text-primary font-semibold">Pro</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Unlock premium analytics, team features, and more.
              </p>
              <Button size="sm" className="w-full text-xs" variant="default">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-lg"
                  >
                    <Sparkles className="h-5 w-5 text-primary" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                Upgrade to Pro
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* ⚙️ Settings + Feedback */}
      <Separator className="opacity-50" />

      <SidebarMenu>
        {/* Settings */}
        <SidebarMenuItem>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  tooltip="Settings"
                  className="w-full flex items-center"
                >
                  <a
                    href="/settings"
                    className={`flex items-center ${
                      open ? "justify-start px-2 gap-2" : "justify-center px-0"
                    }`}
                  >
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    {open && <span className="text-sm">Settings</span>}
                  </a>
                </SidebarMenuButton>
              </TooltipTrigger>
              {!open && (
                <TooltipContent side="right" className="text-xs">
                  Settings
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </SidebarMenuItem>

        {/* Feedback */}
        <SidebarMenuItem>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  tooltip="Feedback"
                  className="w-full flex items-center"
                >
                  <a
                    href="/feedback"
                    className={`flex items-center ${
                      open ? "justify-start px-2 gap-2" : "justify-center px-0"
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    {open && <span className="text-sm">Feedback</span>}
                  </a>
                </SidebarMenuButton>
              </TooltipTrigger>
              {!open && (
                <TooltipContent side="right" className="text-xs">
                  Feedback
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </SidebarMenuItem>
      </SidebarMenu>
            {/* Divider */}
      {/* <Separator className="opacity-50" /> */}
      {/* 👤 Profile Section */}
      {/* <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">AC</AvatarFallback>
                </Avatar>
                {open && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                )}
                <MoreVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">AC</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu> */}

    </div>
  );
}
