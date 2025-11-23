import React from "react";
import { useItems, useDeleteItem } from "@/hooks/Master/useItem";
import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import VA_ItemFormSheet from "./VA_ItemFormSheet";
import { createColumnHelper } from "@tanstack/react-table";
import { Box, Trash2 } from "lucide-react";

const ItemMaster = () => {
  const { data: items = [], isLoading } = useItems();
  console.log("items",items);
  
  
  const deleteMutation = useDeleteItem();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("categoryName", { header: "Category" }),  
    columnHelper.accessor("sku", { header: "SKU" }),
    columnHelper.accessor("price", { header: "Price" }),
    columnHelper.accessor("uom", { header: "UOM" }),
    columnHelper.accessor("isActive", {
      header: "Active",
      cell: (info) => (info.getValue() ? "Active" : "inactive"),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <VA_ItemFormSheet mode="update" initialData={row.original} />
          <VA_AlertDialog
            variant="danger"
            title="Delete Item"
            description="This action cannot be undone."
            actionText="Delete"
            trigger={<VA_Button icon={<Trash2 />} variant="ghost" size="sm" />}
            onAction={() => deleteMutation.mutate(row.original._id)}
          />
        </div>
      ),
    }),
  ];

  return (
    <div className="space-y-4">
      <VA_DataTable
        title="Items"
        description="Manage Your Items in Here"
        icon={<Box/>}
        columns={columns}
        data={items}
        loading={isLoading}
        emptyMessage="No items found."
        addONActions={<VA_ItemFormSheet mode="create" />}
      />
    </div>
  );
};

export default ItemMaster;
