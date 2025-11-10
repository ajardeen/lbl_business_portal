"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronDown, ChevronUp, Eye, X, FileDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput,
} from "../ui/command";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "../ui/checkbox";

// ------------------------------------
// Sample Data
// ------------------------------------
const data = Array.from({ length: 48 }, (_, i) => ({
  id: `${i + 1}`,
  name: `User ${i + 1}`,
  amount: Math.floor(Math.random() * 5000),
  status: ["pending", "processing", "completed"][i % 3],
  email: `user${i + 1}@example.com`,
}));

// ------------------------------------
// Utility: Check if column is numeric
// ------------------------------------
const isNumeric = (value) =>
  typeof value === "number" || (!isNaN(value) && value !== "");

// ------------------------------------
// Main Component
// ------------------------------------
function VA_DataTable({
  title = "Data Table",
  description = "Interactive data view with sorting, pagination and analytics",
  footerText = "Table generated using Vision Action UI",
  footerConfig = true,
  addONActions = <></>,
}) {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [footerCalcs, setFooterCalcs] = useState({});
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  // ------------------------------------
  // Table Columns
  // ------------------------------------
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: "sm",
        width: "30px",
      },

      {
        id: "sno",
        header: "S.No",
        cell: ({ row }) => row.index + 1,
        enableSorting: false,
        enableHiding: false,
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "status", header: "Status" },
    ],
    []
  );

  // ------------------------------------
  // React Table setup
  // ------------------------------------
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      globalFilter,
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase();
      return Object.values(row.original).some((value) =>
        String(value).toLowerCase().includes(searchValue)
      );
    },
  });

  // Log selected rows
  useEffect(() => {
    console.log(
      "Selected Rows:",
      table.getSelectedRowModel().rows.map((r) => r.original)
    );
  }, [rowSelection]);

  // ------------------------------------
  // Footer Calculation Logic
  // ------------------------------------
  const calculateValue = (colId) => {
    const colData = table
      .getFilteredRowModel()
      .rows.map((r) => r.original[colId])
      .filter((v) => v !== undefined && v !== null);

    const calcType = footerCalcs[colId];
    if (!calcType || calcType === "none") return "";

    const numericValues = colData.map(Number).filter((v) => !isNaN(v));

    switch (calcType) {
      case "count":
        return colData.length;
      case "sum":
        return numericValues.reduce((a, b) => a + b, 0);
      case "average":
        return (
          numericValues.reduce((a, b) => a + b, 0) / numericValues.length || 0
        ).toFixed(2);
      case "min":
        return Math.min(...numericValues);
      case "max":
        return Math.max(...numericValues);
      default:
        return "";
    }
  };

  const getFooterOptions = (colId) => {
    const sample = data.find((d) => d[colId]);
    const numeric = isNumeric(sample?.[colId]);
    return numeric
      ? ["none", "count", "sum", "average", "min", "max"]
      : ["none", "count"];
  };

  // ------------------------------------
  // Export
  // ------------------------------------
  const handleExport = (type) => {
    alert(`Exporting as ${type.toUpperCase()}...`);
  };

  // ------------------------------------
  // Render
  // ------------------------------------
  return (
    <div className="space-y-3">
      {/* Title & Description */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {addONActions}
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center py-2">
        <div className="flex gap-3 items-center">
          {/* Columns selection */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-32 justify-between">
                <Eye className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[var(--radix-popover-trigger-width)] p-0"
              sideOffset={4}
            >
              <Command>
                <CommandInput placeholder="Search columns..." />
                <CommandList>
                  <CommandEmpty>No columns found.</CommandEmpty>
                  <CommandGroup>
                    {table
                      .getAllLeafColumns()
                      .filter((col) => col.getCanHide())
                      .map((col) => (
                        <CommandItem
                          key={col.id}
                          value={col.id}
                          onSelect={() =>
                            col.toggleVisibility(!col.getIsVisible())
                          }
                          className="flex justify-between items-center"
                        >
                          <span className="capitalize">{col.id}</span>
                          <Check
                            className={cn(
                              "h-4 w-4 text-primary transition-opacity",
                              col.getIsVisible() ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Search */}
          <InputGroup className="w-72">
            <InputGroupInput
              placeholder="Search all columns..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            {globalFilter && (
              <InputGroupAddon
                align="inline-end"
                onClick={() => setGlobalFilter("")}
              >
                <X className="h-4 w-4 cursor-pointer text-foreground" />
              </InputGroupAddon>
            )}
          </InputGroup>
        </div>

        {/* Export */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export
              <ChevronDown className="h-3 w-3 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["csv", "excel", "pdf"].map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => handleExport(type)}
                className="capitalize"
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          {/* Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.getCanSort?.();
                  const sorted = header.column.getIsSorted();

                  return (
                    <TableHead
                      key={header.id}
                      onClick={
                        isSortable
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      style={{ width: header.column.columnDef.width }}
                      className={cn(
                        "capitalize bg-accent font-medium select-none cursor-pointer",
                        isSortable && "hover:bg-accent/70"
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {sorted === "asc" && <ChevronUp className="h-3 w-3" />}
                        {sorted === "desc" && (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* Body */}
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : ""}
                  className={cn(
                    "transition-colors hover:bg-accent/30",
                    row.getIsSelected() &&
                      "bg-accent/60 !border-l-1 border-primary [&:last-child]:border-1 [&:last-child]:border-b border-b-transparent"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.columnDef.width }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell ??
                          cell.column.columnDef.header,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8 text-sm text-muted-foreground"
                >
                  No matching results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Footer */}
          {footerConfig && (
            <TableFooter>
              <TableRow>
                {table.getAllLeafColumns().map((col) => {
                  const options = getFooterOptions(col.id);
                  const current = footerCalcs[col.id] || "none";
                  const value = calculateValue(col.id);

                  return (
                    <TableCell key={col.id}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center justify-between w-full p-0"
                          >
                            <span
                              className={cn(
                                "capitalize text-xs transition-opacity duration-200",
                                current === "none"
                                  ? "opacity-0 hover:opacity-70"
                                  : "opacity-100"
                              )}
                            >
                              {current === "none"
                                ? "calculate"
                                : `${current}: ${isNaN(value) ? value : value}`}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="p-0 w-40">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {options.map((opt) => (
                                  <CommandItem
                                    key={opt}
                                    value={opt}
                                    onSelect={() =>
                                      setFooterCalcs((prev) => ({
                                        ...prev,
                                        [col.id]: opt,
                                      }))
                                    }
                                    className="flex justify-between"
                                  >
                                    <span className="capitalize">{opt}</span>
                                    {footerCalcs[col.id] === opt && (
                                      <Check className="h-4 w-4 text-primary" />
                                    )}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 text-sm text-muted-foreground">
        {/* Page Info */}
        <div className="text-center sm:text-left mb-2 sm:mb-0 ">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        {/* Centered Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Pagination>
            <PaginationContent className="justify-center">
              {/* Prev Button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  className={cn(
                    !table.getCanPreviousPage() &&
                      "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {/* Page Numbers */}
              {(() => {
                const totalPages = table.getPageCount();
                const current = table.getState().pagination.pageIndex;
                const visiblePages = [];

                // Minimum of 5 pages visible, adaptive range
                let start = Math.max(current - 2, 0);
                let end = Math.min(start + 4, totalPages - 1);

                if (end - start < 4) {
                  start = Math.max(end - 4, 0);
                }

                for (let i = start; i <= end; i++) {
                  visiblePages.push(i);
                }

                // Add first page if not visible
                if (start > 0) {
                  visiblePages.unshift(0);
                  if (start > 1) visiblePages.splice(1, 0, "ellipsis-start");
                }

                // Add last page if not visible
                if (end < totalPages - 1) {
                  if (end < totalPages - 2) visiblePages.push("ellipsis-end");
                  visiblePages.push(totalPages - 1);
                }

                return visiblePages.map((page, idx) => {
                  if (page === "ellipsis-start" || page === "ellipsis-end")
                    return <PaginationEllipsis key={idx} />;

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === current}
                        onClick={() => table.setPageIndex(page)}
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                });
              })()}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  className={cn(
                    !table.getCanNextPage() && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        {/* Page size dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {table.getState().pagination.pageSize} / page
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[5, 10, 25, 50].map((size) => (
              <DropdownMenuItem
                key={size}
                onClick={() => table.setPageSize(size)}
              >
                {size} / page
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Footer Text */}
      <div className="text-center text-xs text-muted-foreground py-2">
        {footerText}
      </div>
    </div>
  );
}

export default VA_DataTable;
