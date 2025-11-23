import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useOrganizationData } from "@/context/OrganizationContext";
import { useBranches } from "@/hooks/Settings/useBranch";

export default function VA_SidebarHeader() {
   const { data: branches = [], isLoading:branchLoading } = useBranches();
  const {
    organizationDetails,
    isLoading,
    branchIds,
    selectedBranchId,
    setSelectedBranchId,
  } = useOrganizationData();

  const headerConfig = React.useMemo(
    () => ({
      title: organizationDetails?.name || "Organization",
      options: branches.map((branch) => ({
        label: branch.branchName,
        value: branch._id,
      })),
    }),
    [organizationDetails?.name, branchIds]
  );

  const selectedOption = headerConfig.options.find(
    (opt) => opt.value === selectedBranchId
  );
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent">
                  <img
                    src={"./images/lbl_icon.png"}
                    alt="Lunchbox Legends Logo"
                    className="w-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-0.5 leading-none text-left">
                  <span className="font-medium">
                    {isLoading ? "Loading..." : headerConfig.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedOption?.label || "Select Branch"}
                  </span>
                </div>

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
                  onSelect={() => setSelectedBranchId(opt.value)}
                >
                  {opt.label}
                  {opt.value === selectedBranchId && (
                    <Check className="ml-auto size-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SidebarMenuButton size="lg">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent">
              <img
                src={"./images/lbl_icon.png"}
                alt="Lunchbox Legends Logo"
                className="h-7 w-7 object-contain"
              />
            </div>

            <div className="flex flex-col gap-0.5 leading-none text-left">
              <span className="font-medium">{headerConfig.title}</span>
              <span className="text-xs text-muted-foreground">
                {headerConfig.options[0]?.label || "No Branch Selected"}
              </span>
            </div>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}