import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMenus, useDeleteMenu } from "@/hooks/Master/useMenu";

import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import { FilePenLine, PlusCircle, Trash2 } from "lucide-react";

import VA_MenuFormSheet from "./VA_MenuFormSheet";
import VA_MenuViewSheet from "./VA_MenuViewSheet";

const MenuMaster = () => {
  const { data: menus = [], isLoading } = useMenus();
  const deleteMutation = useDeleteMenu();
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", { header: "Menu Name" }),
    columnHelper.accessor("description", { header: "Description" }),
    columnHelper.accessor("dayOfWeek", { header: "Day" }),
    columnHelper.accessor("status", { header: "Status" }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <VA_MenuViewSheet rowData={row.original} />
          <VA_MenuFormSheet mode="update" initialData={row.original} />
          <VA_AlertDialog
            title="Delete Menu"
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
    <div className="p-4 space-y-4">
      <VA_DataTable
        title="Menus"
        description="Manage your menu creation"
        icon={<FilePenLine/>}
        columns={columns}
        data={menus}
        loading={isLoading}
        addONActions={<VA_MenuFormSheet mode="create" />}
      />
    </div>
  );
};

export default MenuMaster;
