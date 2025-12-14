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
  columnHelper.accessor("name", {
    header: "Bundle Name",
    size: 30, // wider for text
    meta: {
      align: "left",
      wrap: true,
    },
  }),

  columnHelper.accessor("bundleMealType", {
    header: "Meal Type",
    size: 15,
    meta: {
      align: "center",
      wrap: false,
    },
  }),

  columnHelper.accessor("totalMealsCount", {
    header: "Total Meals",
    size: 10,
    meta: {
      align: "center",
      wrap: false,
    },
  }),

  columnHelper.accessor("price", {
    header: "Price",
    size: 15,
    meta: {
      align: "right",
      wrap: false,
    },
    cell: ({ row }) => `₹ ${row.original.price}`,
  }),

  columnHelper.accessor("isPublished", {
    header: "Published",
    size: 15,
    meta: {
      align: "center",
      wrap: false,
    },
    cell: ({ row }) =>
      row.original.isPublished ? (
        <Badge variant="success" text="Published" />
      ) : (
        <Badge variant="secondary" text="Unpublished" />
      ),
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    size: 15,
    meta: {
      align: "center",
      wrap: false,
    },
    cell: ({ row }) => (
      <div className="flex justify-center ">
        <VA_BundleViewSheet bundleId={row.original._id} />
        <VA_AlertDialog
          title="Delete Bundle"
          description="This action cannot be undone."
          variant="danger"
          trigger={
            <VA_Button
              icon={<Trash2 className="text-destructive" />}
              variant="ghost"
              size="sm"
            />
          }
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
