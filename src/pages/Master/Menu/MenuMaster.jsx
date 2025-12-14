import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMenus, useDeleteMenu } from "@/hooks/Master/useMenu";

import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import { FilePenLine, PlusCircle, Trash2 } from "lucide-react";

import VA_MenuFormSheet from "./VA_MenuFormSheet";
import VA_MenuViewSheet from "./VA_MenuViewSheet";
import Badge from "@/components/ui/Badge";

const MenuMaster = () => {
  const { data: menus = [], isLoading } = useMenus();
  const deleteMutation = useDeleteMenu();
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", { header: "Menu Name", size: 20 }),
    columnHelper.accessor("description", { header: "Description",size: 35, }),
    columnHelper.accessor("suggestedDay", { header: "Day",size: 10, }),
    columnHelper.display({
      id: "isActive",
      header: "Status",
      size: 15,
      cell: ({ row }) => (
        <Badge
          variant={row.original.isActive ? "success" : "destructive"}
          text={row.original.isActive ? "Active" : "Inactive"}
        />
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      size: 20,
      meta: { align: "center" },
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <VA_MenuViewSheet rowData={row.original} />
          <VA_MenuFormSheet mode="update" initialData={row.original} />
          <VA_AlertDialog
            title="Delete Menu"
            description="This action cannot be undone."
            variant="danger"
            trigger={<VA_Button icon={<Trash2 className="text-destructive"/>} variant="ghost" size="sm" />}
            onAction={() => deleteMutation.mutate(row.original._id)}
          />
        </div>
      ),
    }),
  ];

  return (
    <div className="">
      <VA_DataTable
        title="Menus"
        description="Manage your menu creation"
        icon={<FilePenLine />}
        columns={columns}
        data={menus}
        loading={isLoading}
        addONActions={<VA_MenuFormSheet mode="create" />}
      />
    </div>
  );
};

export default MenuMaster;
