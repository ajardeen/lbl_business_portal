import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { CheckCircle2, PackagePlus } from "lucide-react";

// --- VA Components ---
import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";

// --- Hooks ---

import { useAdminSubscriptions, useSubscriptionApprove } from "@/hooks/CloudKitchen/useSubscriptionApprove";

const columnHelper = createColumnHelper();

const SubscriptionApproval = () => {
  const { data: subscriptions = [], isLoading } = useAdminSubscriptions();
  const approveSubscription = useSubscriptionApprove();

  const confirmApprove = (subscription) => {
    approveSubscription.mutateAsync(subscription._id);
  };

  const columns = [
    columnHelper.accessor("bundleName", {
      header: "Bundle",
    }),
    columnHelper.accessor("customerId.fullName", {
      header: "Customer",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("mealType", {
      header: "Meal",
      cell: (info) => info.getValue()?.toUpperCase(),
    }),
    columnHelper.accessor("totalPrice", {
      header: "Amount",
      cell: (info) => `₹${info.getValue()}`,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span className="capitalize text-yellow-600">
          {info.getValue().replaceAll("_", " ")}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <VA_AlertDialog
          title="Approve Subscription"
          description={`Approve subscription for ${row.original.bundleName}?`}
          actionText="Approve"
          onAction={() => confirmApprove(row.original)}
          trigger={
            <VA_Button
              icon={<CheckCircle2 size={16} color="green" />}
              disabled={row.original.status !== "pending_approval"}
              variant="outline"
              size="sm"
            >
              Approve
            </VA_Button>
          }
        />
      ),
    }),
  ];

  return (
    <VA_DataTable
      title="Subscription Approvals"
      description="Approve subscriptions to activate daily meals"
      icon={<PackagePlus />}
      isLoading={isLoading}
      columns={columns}
      data={subscriptions}
      emptyText="No subscriptions awaiting approval"
    />
  );
};

export default SubscriptionApproval;
