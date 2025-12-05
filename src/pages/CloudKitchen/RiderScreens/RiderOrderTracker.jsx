import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RiderLayout from "./RiderLayout";
import VA_Button from "@/components/VAComponents/VA_Button";
import { Navigation, Phone, MapPin, Package } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeliveryStatus } from "@/hooks/CloudKitchen/useDeliveryStatus";
import { useRiderTaskDetail } from "@/hooks/CloudKitchen/useRiderOrderDetail";

const RiderOrderTracker = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { updateStatus, loading: updating } = useDeliveryStatus();
  const { orderData, loading, refetch } = useRiderTaskDetail(taskId, false);

  const [order, setOrder] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState("not_started");

  // Load task details (same as RiderOrderDetail)
  useEffect(() => {
    refetch();
    if (!orderData) return;
    setOrder(orderData.data.data);
  }, [loading]);

  // Keep UI delivery status synced
  useEffect(() => {
    if (!order) return;
    // If already accepted & picked up earlier, make sure UI status is correct
    if (order.deliveryStatus === "en_route") setDeliveryStatus("in_progress");
    if (order.deliveryStatus === "delivered") setDeliveryStatus("delivered");
  }, [order]);

  if (!order) return null;

  const handleStart = async () => {
    const ok = await updateStatus(taskId, "on_the_way");
    if (ok) {
      setDeliveryStatus("in_progress");
      refetch();
    }
  };

  const handleDelivered = async () => {
    const ok = await updateStatus(taskId, "delivered");
    if (ok) {
      setDeliveryStatus("delivered");
      refetch();
    }
  };

  return (
    <AlertDialog>
      <RiderLayout>
        <div className="w-full max-w-4xl p-4 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Track Delivery</h2>

          {/* Customer + Package Summary with Action Buttons */}
          <div className="bg-white shadow rounded-2xl p-4 flex flex-col gap-3">
            <p className="font-bold text-lg">{order.customer.name}</p>

            <div className="flex items-center justify-between">
              <a
                href={`tel:${order.customer.phone}`}
                className="flex items-center gap-2 text-gray-700"
              >
                <Phone className="h-4 w-4 text-black" /> {order.customer.phone}
              </a>
              <VA_Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:${order.customer.phone}`)}
                icon={<Phone className="h-4 w-4" />}
              >
                Call
              </VA_Button>
            </div>

            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-gray-700 flex-grow">
                <MapPin className="h-4 w-4 text-black" />{" "}
                {order.deliveryAddress}
              </p>
              <VA_Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      order.deliveryAddress
                    )}`,
                    "_blank"
                  )
                }
                icon={<Navigation className="h-4 w-4" />}
              >
                Map
              </VA_Button>
            </div>

            {/* Original address display, now potentially redundant if using the button above */}
            <p className="hidden flex items-center gap-2 text-gray-700">
              <MapPin className="h-4 w-4 text-black" /> {order.deliveryAddress}
            </p>

            <div className="pt-2">
              <h3 className="font-semibold text-base">Package</h3>
              <p className="flex items-center gap-2 text-gray-700">
                <Package className="h-4 w-4 text-gray-500" /> {order.bundleName}{" "}
                — {order.menuName}
              </p>
              <p className="text-sm">Qty: {order.quantity}</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-[60vh] bg-gray-200 flex items-center justify-center text-gray-600 rounded-2xl shadow">
            📍 {order.deliveryAddress}
          </div>
        </div>

        {/* Footer */}
        <div className="min-h-20 border-t shadow-2xl fixed bottom-0 right-0 px-5 w-full flex justify-center bg-white gap-3">
          {deliveryStatus === "not_started" && (
            <VA_Button
              className="p-6 rounded-full w-80"
              onClick={handleStart}
              disabled={updating}
            >
              Start Delivery
            </VA_Button>
          )}

          {deliveryStatus === "in_progress" && (
            <AlertDialogTrigger asChild>
              <VA_Button
                className="p-6 rounded-full min-w-50"
                disabled={updating}
              >
                Mark as Delivered
              </VA_Button>
            </AlertDialogTrigger>
          )}

          {deliveryStatus === "delivered" && (
            <div className="flex flex-col items-center gap-2">
              <div className="text-green-600 font-semibold text-xl">
                Delivered Successfully
              </div>
              <VA_Button
                variant="outline"
                onClick={() => navigate("/cloud-kitchen/rider")}
              >
                Back to Orders
              </VA_Button>
            </div>
          )}
        </div>
      </RiderLayout>

      {/* Delivery Confirmation Dialog */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delivery</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you have delivered the order?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelivered} disabled={updating}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RiderOrderTracker;
