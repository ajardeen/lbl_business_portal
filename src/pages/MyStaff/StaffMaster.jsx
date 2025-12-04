import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import VA_StaffFormSheet from "./VA_StaffFormSheet";
import {
  useStaffs,
  useDeleteStaff,
  useSuspendStaff,
} from "@/hooks/MyStaff/useStaff";
import { createColumnHelper } from "@tanstack/react-table";
import { PauseCircle, Trash2 } from "lucide-react";

export default function StaffMaster() {
  const { data: staffs = [], isLoading } = useStaffs();
  const deleteMutation = useDeleteStaff();
  const suspendMutation = useSuspendStaff();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("phone", { header: "Phone" }),
    columnHelper.accessor("role", { header: "Role" }),
    columnHelper.accessor("status", { header: "Status" }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <VA_StaffFormSheet mode="update" initialData={row.original} />

          <VA_Button
            icon={<PauseCircle size={16} />}
            variant="ghost"
            size="sm"
            onClick={() => suspendMutation.mutate(row.original._id)}
          >
            
          </VA_Button>

          <VA_AlertDialog
            variant="danger"
            actionText="Delete"
            title="Delete Staff"
            description="This action cannot be undone."
            onAction={() => deleteMutation.mutate(row.original._id)}
            trigger={<VA_Button icon={<Trash2 />} variant="ghost" size="sm" />}
          />
        </div>
      ),
    }),
  ];

  return (
   

      <VA_DataTable
        title="Staff Management"
        description="Management all the staff related activity"
        addONActions={<VA_StaffFormSheet mode="create" />}
        columns={columns}
        data={staffs}
        isLoading={isLoading}
        searchField="name"
      />

  );
}
