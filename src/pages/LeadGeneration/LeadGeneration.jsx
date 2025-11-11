"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { SiGoogleadsense } from "react-icons/si";
import SyncButton from "@/components/VAComponents/SyncButton";
import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import VA_AreaChart from "@/components/VAComponents/VA_AreaChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/_UItemp/card";
import { ChartSpline } from "lucide-react";

// ✅ Fetch Firestore Leads
const fetchLeads = async () => {
  const querySnapshot = await getDocs(collection(db, "lunchboxleads"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ✅ Helper: generate chart data for given days
const generateChartData = (leads, days) => {
  if (!Array.isArray(leads) || leads.length === 0) return [];

  const formatDate = (date) => date.toISOString().split("T")[0];

  const parsed = leads.map((lead) => {
    const ts = lead.createdAt;
    const date =
      ts?.seconds && typeof ts.seconds === "number"
        ? new Date(ts.seconds * 1000)
        : ts?.toDate
        ? ts.toDate()
        : new Date();
    return { ...lead, createdAt: date };
  });

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days + 1);

  const countsByDate = {};
  parsed.forEach((lead) => {
    const created = lead.createdAt;
    if (created >= start && created <= end) {
      const key = formatDate(created);
      countsByDate[key] = (countsByDate[key] || 0) + 1;
    }
  });

  const chartData = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = formatDate(new Date(d));
    chartData.push({ date: key, count: countsByDate[key] || 0 });
  }

  return chartData;
};

export default function LeadGeneration() {
  const queryClient = useQueryClient();

  const { data = [], isFetching } = useQuery({
    queryKey: ["leads"],
    queryFn: fetchLeads,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const handleLeadGeneration = async () => {
    await queryClient.invalidateQueries(["leads"]);
  };

  // Stats
  const totalLeads = data.length;
  const todayLeads = data.filter((lead) => {
    const created = lead.createdAt?.toDate
      ? lead.createdAt.toDate()
      : new Date(lead.createdAt?.seconds * 1000);
    return created.toDateString() === new Date().toDateString();
  }).length;

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekLeads = data.filter((lead) => {
    const created = lead.createdAt?.toDate
      ? lead.createdAt.toDate()
      : new Date(lead.createdAt?.seconds * 1000);
    return created >= weekStart;
  }).length;

  // Chart datasets
  const weekData = generateChartData(data, 7);
  const monthData = generateChartData(data, 30);
  const yearData = generateChartData(data, 365);

  // Table
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", { header: "Name" }),
      columnHelper.accessor("email", { header: "Email" }),
      columnHelper.accessor("phoneNumber", { header: "Phone" }),
      columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: (info) => {
          const ts = info.getValue();
          if (!ts) return "";
          const date = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000);
          return date.toLocaleString();
        },
      }),
    ],
    []
  );

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4">
        <h1 className="text-lg md:text-2xl font-semibold flex items-center gap-2">
          <ChartSpline className="text-primary" /> Leads Dashboard
        </h1>
        <SyncButton
          loading={isFetching}
          textState={true}
          onClick={handleLeadGeneration}
        />
      </header>

      {/* Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Left Card */}
        <div className="lg:col-span-2">
          <Card
            className="     h-fit 
    border border-border 
    shadow-sm 
    transition-colors 
    text-card-foreground
    bg-gradient-to-br from-blue-500/20 via-transparent/10 to-white
    dark:from-blue-500/30 dark:via-transparent/10 dark:to-[#0B0B0B]
  "
          >
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle className="text-base font-semibold">
                  Lead Statistics
                </CardTitle>
                <span className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full">
                  30 Days
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <p className="text-5xl md:text-6xl font-bold">{totalLeads}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total Leads in a Month
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    This Week
                  </span>
                  <span className="font-semibold">{weekLeads}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Today
                  </span>
                  <span className="font-semibold">{todayLeads}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-4 border border-border bg-muted/40 text-muted-foreground shadow-none transition-colors">
            <CardContent className="text-sm py-3">
              Tip: Switch between{" "}
              <span className="text-primary font-medium">7d</span>,{" "}
              <span className="text-primary font-medium">30d</span>, or{" "}
              <span className="text-primary font-medium">year</span> views to
              spot lead trends.
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="lg:col-span-5 p-0  border-0  bg-card text-card-foreground shadow-none transition-colors">
          {data.length > 0 ? (
            <VA_AreaChart
              datasets={{
                week: weekData,
                month: monthData,
                year: yearData,
              }}
              chartConfig={{
                count: { label: "Leads", color: "#2563EB" },
              }}
              title="Lead Generation Trend"
              description="Leads grouped by selected period"
            />
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No data available for chart
            </p>
          )}
        </Card>
      </div>

      {/* Table Section */}
      <Card className="border border-border bg-card text-card-foreground shadow-sm transition-colors">
        {/* <CardHeader>
          <CardTitle className="text-base font-semibold">Lead Records</CardTitle>
        </CardHeader> */}
        <CardContent>
          <VA_DataTable
            title="Lead Records"
            description="All Registered customer table"
            data={data}
            columns={columns}
            // selectedRowData,
            // onSelectedRowsChange,
            rowSelectingOption={false}
            showSno={true}
            footerText="Table generated using Vision Action UI"
            footerConfig={true}
            footerCalcColumns={["name", "email"]}
            // addONActions = <></>
          />
        </CardContent>
      </Card>
    </div>
  );
}
