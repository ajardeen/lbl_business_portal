import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";


function LeadGenerationTable({ data  }) {
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
      columnHelper.accessor("name", { header: "Name" }),
      columnHelper.accessor("email", { header: "Email" }),
      columnHelper.accessor("phoneNumber", { header: "Phone" }),
      columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: (info) => {
          const ts = info.getValue();
          if (!ts) return "";
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
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportToExcel = () => {
    const dataToExport = filteredData.map((lead) => {
      const ts = lead.createdAt;
      const createdAt = ts
        ? (ts.toDate ? ts.toDate() : new Date(ts)).toLocaleString()
        : "";
      return {
        Name: lead.name,
        Email: lead.email,
        "Phone Number": lead.phoneNumber,
        "Created At": createdAt,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "Leads.xlsx");
  };

  return (
    <div className="lead-card">
      {/* Header */}
      <div className="lead-header">
        <h2>Registered Users </h2>

        <div className="lead-controls">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button onClick={exportToExcel} className="export-btn">
            <PiMicrosoftExcelLogoFill size={18} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container overflow-x-auto">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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

      {/* Pagination */}
      <div className="pagination-container">
        <div className="page-controls">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span>
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
        </div>

        <Select.Root
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <Select.Trigger className="page-size-trigger">
            <Select.Value placeholder="Rows per page" />
            <Select.Icon>
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="page-size-content" position="popper">
              <Select.ScrollUpButton className="scroll-btn">
                <ChevronUp size={16} />
              </Select.ScrollUpButton>
              <Select.Viewport className="page-size-viewport">
                {[10, 20, 50, 100].map((size) => (
                  <Select.Item
                    key={size}
                    value={String(size)}
                    className="page-size-item"
                  >
                    <Select.ItemText>Show {size}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="scroll-btn">
                <ChevronDown size={16} />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}

export default LeadGenerationTable;
