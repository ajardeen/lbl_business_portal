import React from "react";
import { FaHardHat } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";

function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex gap-3 justify-start items-center">
        <GoHomeFill color="rgb(0 118 255)" />
        Dashboard
      </h1>
      <div className="flex-1 flex flex-col items-center justify-center text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6">
        <FaHardHat className="text-5xl text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">
          Pardon Our Dust!
        </h2>
        <p className="text-gray-500 mt-2 max-w-md">
          This dashboard is currently under construction. We're working hard to
          bring you an amazing experience. Please check back later!
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
