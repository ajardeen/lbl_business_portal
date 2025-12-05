import React from "react";
import TopNavigation from "./TopNavigation";

function RiderLayout({ children }) {
  return (
    <div>
      <TopNavigation />
      <div className="flex justify-center max-w-md">{children}</div>;
    </div>
  );
}

export default RiderLayout;
