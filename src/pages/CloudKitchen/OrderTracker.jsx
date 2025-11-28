import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { CheckCircle2, PackagePlus } from "lucide-react";

// --- VA Components ---
import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_AlertDialog from "@/components/VAComponents/VA_AlertDialog";
import VA_Toast from "@/components/VAComponents/VA_Toast";

// --- Hook ---
import { useOrders } from "@/hooks/CloudKitchen/useOrder";

const columnHelper = createColumnHelper();

const OrderTracker = () => {
  const { data: orders = [], isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleApprove = (order) => {
    setSelectedOrder(order);
    setShowDialog(true);
  };

  const confirmApprove = () => {
    console.log("Approved Order:", selectedOrder);
    VA_Toast.success(`Order ${selectedOrder?.orderNumber} approved!`);
    setShowDialog(false);
  };

  const columns = [
    columnHelper.accessor("orderNumber", {
      header: "Order #",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("customerId.fullName", {
      header: "Customer",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("bundleName", {
      header: "Bundle",
    }),
    columnHelper.accessor("totalPrice", {
      header: "Total Price",
      cell: (info) => `₹${info.getValue()}`,
    }),
    columnHelper.accessor("paymentStatus", {
      header: "Payment",
      cell: (info) => (
        <span
          className={`capitalize ${
            info.getValue() === "paid"
              ? "text-green-600"
              : info.getValue() === "pending"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span className="capitalize">
          {info.getValue().replaceAll("_", " ")}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
           <VA_AlertDialog
            title="Approve Order"
            description={`Do you want to approve order #${row.original.orderNumber}?`}
            actionText="Approve"
            onAction={() => handleApprove(row.original)}
            trigger={
              <VA_Button
                icon={<CheckCircle2 size={16} />}
                variant="ghost"
                size="sm"
              />
            }
          />
        </div>
      ),
    }),
  ];

  return (
    <div className="">
      <VA_DataTable
        title="Orders"
        description="Approve your order to proceed to kitchen"
        icon={<PackagePlus/>}
        isLoading={isLoading}
        columns={columns}
        data={orders}
        emptyText="No orders found"
      />


    </div>
  );
};

export default OrderTracker;
