import React from "react";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/_UItemp/sidebar.jsx";
import VA_Sidebar from "./VA_Sidebar";
import VA_TopNavigation from "./VA_TopNavigation";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <VA_Sidebar />

      {/* Content layout remains unaffected */}
      <SidebarInset className=" h-screen overflow-hidden">
        <VA_TopNavigation />

        <main className="flex-1 overflow-auto p-6 max-h-screen ">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
