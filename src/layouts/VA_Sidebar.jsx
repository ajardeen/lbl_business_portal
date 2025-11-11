import React from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/_UItemp/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/_UItemp/sidebar";

import VA_SidebarHeader from "@/components/SidebarComponents/VA_SidebarHeader";
import VA_SidebarFooter from "@/components/SidebarComponents/VA_SidebarFooter";
import { sidebarConfig } from "@/configs/sidebarConfig";

export default function VA_Sidebar() {
  const location = useLocation();

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="border-r"
    >
      {/* Header */}
      <SidebarHeader>
        <VA_SidebarHeader />
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {sidebarConfig.map((group) => (
          <SidebarGroup key={group.groupTitle}>
            <SidebarGroupLabel>{group.groupTitle}</SidebarGroupLabel>

            <SidebarMenu>
              {group.menus.map((menu) => {
                const hasSubmenu = menu.submenu && menu.submenu.length > 0;
                const isActive =
                  location.pathname === menu.url ||
                  (menu.submenu &&
                    menu.submenu.some((sub) => location.pathname === sub.url));

                return (
                  <SidebarMenuItem key={menu.menuTitle}>
                    {hasSubmenu ? (
                      <Collapsible
                        className="group/collapsible"
                        defaultOpen={isActive}
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={menu.menuTitle}
                            className={`${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted"
                            }`}
                          >
                            {menu.icon && <menu.icon className="h-5 w-5" />}
                            <span>{menu.menuTitle}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {menu.submenu.map((sub) => {
                              const subActive = location.pathname === sub.url;
                              return (
                                <SidebarMenuSubItem key={sub.submenuTitle}>
                                  <SidebarMenuSubButton asChild>
                                    <Link
                                      to={sub.url}
                                      className={`flex items-center gap-2 ${
                                        subActive
                                          ? "text-primary font-medium"
                                          : "text-muted-foreground hover:text-primary"
                                      }`}
                                    >
                                      <span>{sub.submenuTitle}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        tooltip={menu.menuTitle}
                        asChild
                        className={`${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Link
                          to={menu.url}
                          className="flex items-center gap-2 w-full"
                        >
                          {menu.icon && <menu.icon className="h-5 w-5" />}
                          <span>{menu.menuTitle}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <VA_SidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
