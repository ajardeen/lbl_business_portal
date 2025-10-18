import React, { useEffect } from "react";
import SideBar from "./SideBar/SideBar";
import { IStaticMethods } from "preline/preline";
import TopNav from "./TopNav/TopNav";

window.HSStaticMethods = IStaticMethods;

function Layout({ children }) {
  useEffect(() => {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }, []);

  return (
    <div className="font-runde bg-gray-50 h-screen flex overflow-hidden">
      {/* Sidebar */}
      <SideBar />

      {/* Main content area */}
      <div
        className="
          flex flex-col flex-1
          transition-all duration-300
          lg:ml-0                     /* default sidebar width on large screens */
          hs-overlay-minified:lg:ml-0 /* when sidebar minimized */
        "
      >
        <TopNav />

        {/* Scrollable main section */}
        <main className="flex-1 overflow-y-auto bg-white p-5">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
