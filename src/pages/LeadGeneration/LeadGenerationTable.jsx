import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";


function LeadGenerationTable({ data }) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, data]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("phoneNumber", {
        header: "Phone Number",
        cell: (info) => info.getValue() || "—",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: (info) => {
          const ts = info.getValue();
          if (!ts) return "—";
          const date = ts.toDate ? ts.toDate() : new Date(ts);
          return date.toLocaleString();
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "Lunchbox_Leads.xlsx");
  };

  return (
    <div className="card-style p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Lead Table</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          />
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 text-green-500 border border-green-500 hover:bg-green-500 hover:text-white px-3 py-1 rounded-md text-sm"
          >
            <PiMicrosoftExcelLogoFill /> Export
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="lead-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadGenerationTable;
