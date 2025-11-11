import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/_UItemp/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/_UItemp/sidebar";

import react from "@/assets/react.svg"; // ✅ Import your logo
import { sidebarHeaderConfig as headerConfig } from "@/configs/sidebarConfig";

export default function VA_SidebarHeader() {
  const [selected, setSelected] = React.useState(headerConfig.options[0]);
  const hasDropdown = headerConfig.options.length > 1;

  return (
    <SidebarMenu className="">
      <SidebarMenuItem>
        {hasDropdown ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {/* ✅ Logo instead of icon */}
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent">
                  <img
                    src={"./images/lbl_icon.png" || react}
                    alt="Lunchbox Legends Logo"
                    className=" object-contain"
                  />
                </div>

                {/* Text Info */}
                <div className="flex flex-col gap-0.5 leading-none text-left">
                  <span className="font-medium">{headerConfig.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {selected.label}
                  </span>
                </div>

                {/* Dropdown Arrow */}
                <ChevronsUpDown className="ml-auto size-4 opacity-60" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width)"
              align="start"
            >
              {headerConfig.options.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onSelect={() => setSelected(opt)}
                >
                  {opt.label}
                  {opt.value === selected.value && (
                    <Check className="ml-auto size-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SidebarMenuButton size="lg">
            {/* ✅ Logo version (no dropdown) */}
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent">
              <img
                src={VisionActionLogo}
                alt="Vision Action Logo"
                className="h-7 w-7 object-contain"
              />
            </div>

            <div className="flex flex-col gap-0.5 leading-none text-left">
              <span className="font-medium">{headerConfig.title}</span>
              <span className="text-xs text-muted-foreground">
                {headerConfig.options[0].label}
              </span>
            </div>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
