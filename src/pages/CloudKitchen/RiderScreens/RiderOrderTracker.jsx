import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "lucide-react";
import RiderLayout from "./RiderLayout";
import VA_Button from "@/components/VAComponents/VA_Button";
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

function RiderOrderTracker() {
  const { id: orderId } = useParams();
  const navigate = useNavigate(); // Corrected: Added navigate initialization
  const [deliveryStatus, setDeliveryStatus] = useState("not_started"); // not_started, in_progress, delivered

  // In a real app, you'd fetch order details by ID
  const order = {
    _id: orderId,
    address: "Shop No.6/7, Arenja Corner, Sector 17, Vashi, Navi Mumbai",
  };
  return (
    <AlertDialog>
      <RiderLayout>
        <div className="w-full max-w-4xl p-1">
         
          <h2 className="text-xl font-semibold mb-4">Order Location</h2>
          {/* Map Embed */}
          <div className="w-full h-[70vh] mb-20 rounded-2xl overflow-hidden border shadow-lg">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                order.address
              )}&output=embed`}
              className="w-full h-full border-none"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="min-h-20 border-t-1 shadow-2xl fixed bottom-0 right-0 px-5 w-full items-center flex justify-center bg-white  gap-3">
          <div className="flex gap-3">
            {deliveryStatus === "in_progress" && (
              <VA_Button
                variant="outline"
                onClick={() => setDeliveryStatus("not_started")}
              >
                Cancel
              </VA_Button>
            )}

            {deliveryStatus === "not_started" && (
              <VA_Button
                className="p-6 rounded-full w-80"
                onClick={() => setDeliveryStatus("in_progress")}
              >
                Start 
              </VA_Button>
            )}

            {deliveryStatus === "in_progress" && (
              <AlertDialogTrigger asChild>
                <VA_Button
                 
                  className="p-6 rounded-full min-w-50"
                >
                  Mark as Delivered
                </VA_Button>
              </AlertDialogTrigger>
            )}

            {deliveryStatus === "delivered" && (
              <div className="p-6 bg-muted min-w-96" disabled>
                 <VA_Button
            variant="outline"
            onClick={() => navigate("/cloud-kitchen/rider")}
          >
            Back to Orders
          </VA_Button>
                Delivered
              </div>
            )}
          </div>
        </div>
      </RiderLayout>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delivery</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you have delivered the order? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => setDeliveryStatus("delivered")}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RiderOrderTracker;
