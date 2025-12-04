import { useState } from "react";
import VA_Button from "@/components/VAComponents/VA_Button";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Phone, Package, Navigation } from "lucide-react";
import RiderLayout from "./RiderLayout";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RiderOrderDetail = () => {
  const { orderId: id } = useParams();
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);

  // Static order data for now
  const order = {
    _id: id,
    orderNumber: "ORD12345",
    customer: {
      name: "John Doe",
      phone: "+91 7041234567",
      email: "john@example.com",
    },
    address: "Shop No.6/7, Arenja Corner, Sector 17, Vashi, Navi Mumbai",
    bundleName: "Wrangler Men Jeans",
    price: 2000,
    quantity: 1,
    paymentStatus: "paid",
    deliveryStatus: "assigned",
  };

  const handleAccept = () => {
    // Here you would typically make an API call to update the order status
    console.log("Order accepted");
    setIsAccepted(true);
  };
  const handleCancel = () => {
    navigate("/cloud-kitchen/rider");
  };

  return (
    <RiderLayout>
      <div className="p-4 bg-blue-50 min-h-screen flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Order Detail</h2>

        <Card className="bg-white rounded-2xl shadow p-4 flex flex-col gap-4 mb-20">
          <p className="text-sm text-gray-600 bg-yellow-100 w-fit font-bold">
            Order ID: {order.orderNumber}
          </p>
          <Separator />
          <h3 className="font-semibold text-base">Customer Details</h3>
          <p className="font-semibold text-lg">{order.customer.name}</p>

          <p className="flex flex-col items-start gap-1 text-base text-gray-700">
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-black" />{" "}
              <p className="text-black">Phone</p>
            </span>
            {order.customer.phone}
          </p>
          <p className="flex flex-col items-start gap-1 text-base text-gray-700">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-black" />{" "}
              <p className="text-black">Address</p>
            </span>
            {order.address}
          </p>
          <Separator />
          <div className="py-1">
            <h3 className="font-semibold text-base">Package Details</h3>
            <p className="font-semibold text-base">{order.bundleName}</p>
            <p className="text-sm">Qty: {order.quantity}</p>
            <p className="flex flex-col items-start gap-1 text-base text-gray-700">
              <span className="flex items-center gap-1">
                <p className="text-black">Payment Status</p>
              </span>
              Paid
            </p>
            <p className="flex flex-col items-start gap-1 text-base text-gray-700">
              <span className="flex items-center gap-1">
                <p className="text-black">Order Status</p>
              </span>
              In Process
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="min-h-20 border-t-1 shadow-2xl fixed bottom-0 right-0 px-5 w-full items-center flex justify-end bg-white  gap-3">
          <VA_Button variant="outline" onClick={handleCancel}>
            Cancel
          </VA_Button>
          {!isAccepted ? (
            <VA_Button onClick={handleAccept} className="p-6 rounded-full">
              Accept Order
            </VA_Button>
          ) : (
            <VA_Button
              icon={<Navigation />}
              iconPosition="right"
              className="p-6 rounded-full min-w-50"
              onClick={() =>
                navigate(`/cloud-kitchen/rider/order/${order._id}/track`)
              }
            >
              Track Location
            </VA_Button>
          )}
        </div>
      </div>
    </RiderLayout>
  );
};

export default RiderOrderDetail;
