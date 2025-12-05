import React from "react";
import TopNavigation from "./TopNavigation";

function KitchenLayout({ children }) {
  return (
    <div className="bg-white">
      <TopNavigation />
      <div>{children}</div>
    </div>
  );
}

export default KitchenLayout;
