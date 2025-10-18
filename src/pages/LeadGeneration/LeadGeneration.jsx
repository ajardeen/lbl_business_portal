import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import LineChart from "../../components/LineChart";
import LeadGenerationTable from "./LeadGenerationTable";
import { SiGoogleadsense } from "react-icons/si";
import SyncButton from "../../components/UI/SyncButton";


const fetchLeads = async () => {
  console.log("fetching data");
  
  const querySnapshot = await getDocs(collection(db, "lunchboxleads"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

function LeadGeneration() {
  const queryClient = useQueryClient();

  // 🧠 TanStack Query to fetch once
  const { data = [], isFetching } = useQuery({
    queryKey: ["leads"],
    queryFn: fetchLeads,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  // 🧩 Sync button click → refetch manually
  const handleLeadGeneration = async () => {
    await queryClient.invalidateQueries(["leads"]);
  };

  // 🧮 Overview Cards
  const totalLeads = data.length;
  const todayLeads = data.filter((lead) => {
    const created = lead.createdAt?.toDate
      ? lead.createdAt.toDate()
      : new Date(lead.createdAt);
    return created.toDateString() === new Date().toDateString();
  }).length;

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekLeads = data.filter((lead) => {
    const created = lead.createdAt?.toDate
      ? lead.createdAt.toDate()
      : new Date(lead.createdAt);
    return created >= weekStart;
  }).length;

  return (
    <div className="">
      <header className="flex w-full mb-6 justify-between items-center">
        <h1 className="text-2xl font-semibold flex gap-2">
          <SiGoogleadsense color="rgb(0 118 255)" /> Leads Dashboard
        </h1>
        <SyncButton
          loading={isFetching}
          textState={true}
          onClick={handleLeadGeneration}
        />
      </header>

      {/* Overview Cards */}
      <div className="card-style grid grid-cols-6 gap-4 mb-6 h-80 p-4">
        <div className="col-span-2">
          <div className="card-styles h-full p-6 rounded-2xl shadow-md bg-gradient-to-b from-blue-50 to-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-gray-700 font-semibold text-lg">
                Lead Statistics
              </h2>
              <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                29 Days
              </span>
            </div>

            <div className="mb-8">
              <p className="text-6xl font-bold text-gray-800">{totalLeads}</p>
              <p className="text-sm text-gray-500 mt-1">
                Total Leads in a Month
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  This Week
                </span>
                <span className="font-semibold text-gray-700">{weekLeads}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Today
                </span>
                <span className="font-semibold text-gray-700">{todayLeads}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="col-span-4">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-gray-700 font-semibold text-lg">
                Lead Generation Graph
              </h2>
            </div>
            <LineChart data={data} height="200px" />
          </div>
        </div>
      </div>

      {/* Table */}
      <LeadGenerationTable data={data} />
    </div>
  );
}

export default LeadGeneration;
