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
import VA_FeedbackDialog from "../VAComponents/VA_FeedbackDialog";
import { Link } from "react-router-dom";

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
      <div className="px-3 hidden">
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
                  <Link
                      to={'/settings'}
                    className={`flex items-center ${
                      open ? "justify-start px-2 gap-2" : "justify-center px-0"
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    {open && <span className="text-sm">Settings</span>}
                  </Link>
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
                <VA_FeedbackDialog>
                  <SidebarMenuButton
                    asChild
                    tooltip="Feedback"
                    className="w-full flex items-center"
                  >
                    <Link
                      className={`flex items-center ${
                        open
                          ? "justify-start px-2 gap-2"
                          : "justify-center px-0"
                      }`}
                    >
                      <MessageSquare className="h-4 w-4 " />
                      {open && <span className="text-sm">Feedback</span>}
                    </Link>
                  </SidebarMenuButton>
                </VA_FeedbackDialog>
              </TooltipTrigger>
              {!open && (
                <VA_FeedbackDialog>
                  <TooltipContent side="right" className="text-xs">
                    Feedback
                  </TooltipContent>
                </VA_FeedbackDialog>
              )}
            </Tooltip>
          </TooltipProvider>
        </SidebarMenuItem>
      </SidebarMenu>
      <Separator className="opacity-50" />
      <div className="h-fit max-h-30 justify-center items-center flex  rounded-sm overflow-hidden">
        {open ? (
          <>
          <img
            src="/images/vabooknobg.svg"
            alt="Vision Action Logo"
            className="object-cover w-40 hidden dark:block"
            />
          <img
            src="/images/vabookdarkversion.svg"
            alt="Vision Action Logo"
            className="object-cover w-40 dark:hidden"
            />
            </>
        ) : (
          <img
            src="/images/vabookicon.svg"
            alt="Vision Action Logo"
            className="object-contain w-40"
          />
        )}
      </div>
    </div>
  );
}
