import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { FileBox, PlusCircle, Trash2 } from "lucide-react";
import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import { useBundles, useDeleteBundle } from "@/hooks/Master/useBundle";

import VA_BundleViewSheet from "./VA_BundleViewSheet";
import { useNavigate } from "react-router-dom";
import Badge from "@/components/ui/Badge";

const BundleMaster = () => {
  const navigate = useNavigate();
  const { data: bundles = [], isLoading } = useBundles();
  const deleteMutation = useDeleteBundle();
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", { header: "Bundle Name" }),
    columnHelper.accessor("description", { header: "Description" }),
    columnHelper.accessor("durationDays", { header: "Duration (Days)" }),
    columnHelper.accessor("basePrice", { header: "Base Price" }),
    columnHelper.accessor("isPublished", {
      header: "Published Status",
      cell: ({ row }) =>
        row.original.isPublished ? (
          <Badge variant="success" text="Published" />
        ) : (
          <Badge variant="default" text="Unpublished" />
        ),
    }),
    columnHelper.accessor("status", { header: "Status" }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <VA_BundleViewSheet rowData={row.original} />
          <VA_AlertDialog
            title="Delete Bundle"
            description="This action cannot be undone."
            variant="danger"
            trigger={<VA_Button icon={<Trash2 />} variant="ghost" size="sm" />}
            onAction={() => deleteMutation.mutate(row.original._id)}
          />
        </div>
      ),
    }),
  ];

  return (
    <VA_DataTable
      title="Bundles"
      description="Manage your bundle creation and publishing"
      icon={<FileBox />}
      columns={columns}
      data={bundles}
      loading={isLoading}
      addONActions={
        <VA_Button
          icon={<PlusCircle />}
          onClick={() => navigate("/master/bundles/create")}
        >
          Create Bundle
        </VA_Button>
      }
    />
  );
};

export default BundleMaster;
