import React from "react";
import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import Badge from "@/components/ui/Badge";

import { createColumnHelper } from "@tanstack/react-table";
import { Edit, LayoutTemplate, Plus, Trash2 } from "lucide-react";

import {
  useCategorys,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/Master/useCategory";

import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import CategoryFormSheet from "./CategoryFormSheet";

const CategoryMaster = () => {
  const { data: categorys = [], isLoading } = useCategorys();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),

    columnHelper.accessor("description", {
      header: "Description",
    }),

    columnHelper.accessor("sortOrder", {
      header: "Sort Order",
      cell: (info) =><div className="text-center w-[50%]">{info.getValue()}</div>,
  
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Badge
          badgeClassName={
            info.getValue() === "active"
              ? "text-green-500 border-green-500"
              : "text-red-500 border-red-500"
          }
          text={info.getValue()?.toUpperCase()}
        />
      ),
    }),

    // ACTIONS COLUMN
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex items-center gap-2">
            {/* ---- UPDATE ---- */}
            <CategoryFormSheet
              mode="update"
              initialData={data}
              mutate={updateMutation.mutate}
              triggerComponent={
                <VA_Button variant="ghost" size="sm" icon={<Edit />} />
              }
            />

            {/* ---- DELETE ---- */}
            <VA_AlertDialog
              variant="danger"
              actionText="Delete"
              onAction={() => deleteMutation.mutate(data._id)}
              title="Delete Category"
              description="This action cannot be undone."
              trigger={
                <VA_Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 className="text-destructive" />}
                />
              }
            />
          </div>
        );
      },
    }),
  ];

  return (
    <VA_DataTable
      title="Category"
      icon={<LayoutTemplate />}
      description="Manage your categories"
      isLoading={isLoading}
      data={categorys}
      columns={columns}
      addONActions={
        <CategoryFormSheet
          mode="create"
          mutate={createMutation.mutate}
          triggerComponent={<VA_Button icon={<Plus />}>Create Category</VA_Button>}
        />
      }
    />
  );
};

export default CategoryMaster;
