import React, { useState, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
import {
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  X,
  FileDown,
  Loader,
} from "lucide-react";
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
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";

const isNumeric = (value) =>
  typeof value === "number" || (!isNaN(value) && value !== "");

function VA_DataTable({
  data = [],
  columns = [],
  icon = null,
  isLoading = false,
  selectedRowData,
  onSelectedRowsChange,
  rowSelectingOption = false,
  showSno = true,
  title = "Data Table",
  description = "Interactive data view",
  footerText = "Table generated using Vision Action UI",
  footerConfig = true,
  footerCalcColumns = [],
  addONActions = <></>,
}) {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [footerCalcs, setFooterCalcs] = useState({});
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const finalColumns = useMemo(() => {
    const dynamicCols = [...columns];
    const baseCols = [];

    if (rowSelectingOption) {
      baseCols.push({
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
        width: "30px",
        size: 5,
      });
    }

    if (showSno) {
      baseCols.push({
        id: "sno",
        header: "S.No",
        cell: ({ row }) => row.index + 1,
        enableSorting: false,
        enableHiding: false,
        size: 5,
        width: "50px",
      });
    }

    return [...baseCols, ...dynamicCols];
  }, [columns, rowSelectingOption, showSno]);

  const getAlignClass = (column) => {
    const align = column.columnDef.meta?.align || "left";

    return align === "center"
      ? "text-center justify-center"
      : align === "right"
        ? "text-right justify-end"
        : "text-left justify-start";
  };

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      columnVisibility,
      globalFilter,
      sorting,
      rowSelection,
    },
    columnResizeMode: "onChange",
    enableRowSelection: !!rowSelectingOption,
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
        String(value).toLowerCase().includes(searchValue),
      );
    },
  });

  useEffect(() => {
    const selected = table.getSelectedRowModel().rows.map((r) => r.original);
    if (typeof onSelectedRowsChange === "function")
      onSelectedRowsChange(selected);
    if (typeof selectedRowData === "function") selectedRowData(selected);
  }, [rowSelection, table, onSelectedRowsChange, selectedRowData]);

  const calculateValue = (colId) => {
    if (!Array.isArray(footerCalcColumns) || footerCalcColumns.length === 0)
      return "";
    if (!footerCalcColumns.includes(colId)) return "";

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
    if (!Array.isArray(footerCalcColumns) || footerCalcColumns.length === 0)
      return ["none"];
    if (!footerCalcColumns.includes(colId)) return ["none"];

    const sample = data.find((d) => d[colId]);
    const numeric = isNumeric(sample?.[colId]);
    return numeric
      ? ["none", "count", "sum", "average", "min", "max"]
      : ["none", "count"];
  };

  const exportOptions = [
    { key: "csv", label: "CSV" },
    { key: "excel", label: "Excel" },
  ];

  const getVisibleColumnsInOrder = () =>
    table
      .getAllLeafColumns()
      .filter((c) => c.getIsVisible())
      .map((c) => c);

  const handleExport = (type) => {
    toast.success(`${type.toUpperCase()} downloaded`);
    const visibleCols = getVisibleColumnsInOrder();

    const headers = visibleCols.map((col) => {
      const headerDef = col.columnDef.header;
      return typeof headerDef === "string" ? headerDef : col.id;
    });

    const rows = table.getFilteredRowModel().rows.map((r) =>
      visibleCols.map((col) => {
        const val = r.original[col.id];
        if (col.id === "sno") return r.index + 1;
        if (col.id === "select") return r.getIsSelected() ? "1" : "0";

        // ✅ Format Firestore timestamps like in UI
        if (val && typeof val === "object" && val.seconds) {
          const date = new Date(val.seconds * 1000);
          return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        }

        return String(val ?? "");
      }),
    );

    if (!rows.length) {
      alert("No data available to export");
      return;
    }

    switch (type) {
      case "csv": {
        const esc = (v) => {
          const s = String(v);
          if (s.includes(",") || s.includes("\n") || s.includes('"')) {
            return '"' + s.replace(/"/g, '""') + '"';
          }
          return s;
        };
        const csvRows = [headers.join(",")];
        rows.forEach((rowArr) => csvRows.push(rowArr.map(esc).join(",")));
        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${title || "data"}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      }
      case "excel": {
        const aoa = [headers, ...rows];
        const worksheet = XLSX.utils.aoa_to_sheet(aoa);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, `${title || "data"}.xlsx`);
        break;
      }
      default:
        break;
    }
  };

  const shouldShowFooter =
    footerConfig &&
    Array.isArray(footerCalcColumns) &&
    footerCalcColumns.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center">
          {icon && (
            <span className="mr-2 p-2 rounded-md text-primary bg-primary/5">
              {isLoading ? (
                <Loader size={20} className="animate-spin text-primary" />
              ) : (
                icon
              )}
            </span>
          )}
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {addONActions}
      </div>

      <div className="flex justify-between items-center py-2 overflow-auto gap-5">
        <div className="flex gap-3 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className=" justify-between">
                <Eye className=" h-4 w-4" /> Columns
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="p-0 w-[var(--radix-popover-trigger-width)+30px]"
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
                              col.getIsVisible() ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-primary "
            >
              <FileDown className="h-4 w-4" /> Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {exportOptions.map((opt) => (
              <DropdownMenuItem
                key={opt.key}
                onClick={() => handleExport(opt.key)}
                className="capitalize"
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.getCanSort?.();
                  const sorted = header.column.getIsSorted();

                  const alignClass = getAlignClass(header.column);

                  return (
                    <TableHead
                      key={header.id}
                      onClick={
                        isSortable
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      style={{ width: header.getSize() }}
                      className={cn(
                        alignClass,
                        "capitalize bg-transparent font-medium select-none cursor-pointer",
                      )}
                    >
                      <div
                        className={cn("flex items-center gap-1", alignClass)}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : ""}
                  className={cn(
                    "transition-colors hover:bg-accent/0",
                    row.getIsSelected() &&
                      "bg-accent/60 border-l-2 border-primary",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className={cn(getAlignClass(cell.column))}
                      
                    >
                      <div title={String(cell.getValue() ?? "")} className="line-clamp-2 overflow-hidden text-ellipsis break-words">
                        {flexRender(
                          cell.column.columnDef.cell ??
                            cell.column.columnDef.header,
                          cell.getContext(),
                        )}
                      </div>
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

          {shouldShowFooter && (
            <TableFooter className="text-xs">
              <TableRow>
                {table
                  .getAllLeafColumns()
                  .filter((col) => col.getIsVisible()) // ✅ Hide footer cell for hidden columns
                  .map((col) => {
                    const options = getFooterOptions(col.id);
                    const current = footerCalcs[col.id] || "none";
                    const value = calculateValue(col.id);

                    return (
                      <TableCell
                        key={col.id}
                        className={cn("p-1", getAlignClass(col))}
                      >
                        {footerCalcColumns.includes(col.id) ? (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full p-0 text-xs"
                              >
                                <span
                                  className={cn(
                                    current === "none"
                                      ? "opacity-30 hover:opacity-70"
                                      : "opacity-100",
                                  )}
                                >
                                  {current === "none"
                                    ? "calculate"
                                    : `${current}: ${
                                        isNaN(value) ? value : value
                                      }`}
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
                                        <span className="capitalize">
                                          {opt}
                                        </span>
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
                        ) : (
                          <span className="text-xs text-muted-foreground"></span>
                        )}
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
                      "pointer-events-none opacity-50",
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
                    !table.getCanNextPage() && "pointer-events-none opacity-50",
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

      <div className="text-center text-xs text-muted-foreground">
        {footerText}
      </div>
    </div>
  );
}

export default VA_DataTable;
