import React from "react";
import { useItems, useDeleteItem } from "@/hooks/Master/useItem";
import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import VA_ItemFormSheet from "./VA_ItemFormSheet";
import { createColumnHelper } from "@tanstack/react-table";
import { Box, Trash2 } from "lucide-react";
import Badge from "@/components/ui/Badge";

const ItemMaster = () => {
  const { data: items = [], isLoading } = useItems();
  console.log("items",items);
  
  
  const deleteMutation = useDeleteItem();

  const columnHelper = createColumnHelper();

  const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    size: 25,
    meta: {
      align: "left",
      wrap: true,
    },
  }),

  columnHelper.accessor("categoryName", {
    header: "Category",
    size: 20,
    meta: {
      align: "left",
      wrap: true,
    },
  }),

  columnHelper.accessor("sku", {
    header: "SKU",
    size: 15,
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
    cell: ({ row }) => `${row.original.price}`,
  }),

  columnHelper.accessor("uom", {
    header: "UOM",
    size: 10,
    meta: {
      align: "center",
      wrap: false,
    },
  }),

  columnHelper.accessor("isActive", {
    header: "Status",
    size: 10,
    meta: {
      align: "center",
      wrap: false,
    },
    cell: (info) =>
      info.getValue() ? (
        <Badge variant="success" text="Active" />
      ) : (
        <Badge variant="secondary" text="Inactive" />
      ),
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    size: 5,
    meta: {
      align: "center",
      wrap: false,
    },
    cell: ({ row }) => (
      <div className="flex justify-center ">
        <VA_ItemFormSheet
          mode="update"
          initialData={row.original}
        />
        <VA_AlertDialog
          variant="danger"
          title="Delete Item"
          description="This action cannot be undone."
          actionText="Delete"
          trigger={
            <VA_Button
              icon={<Trash2 className="text-destructive"/>}
              variant="ghost"
              size="sm"
            />
          }
          onAction={() =>
            deleteMutation.mutate(row.original._id)
          }
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
