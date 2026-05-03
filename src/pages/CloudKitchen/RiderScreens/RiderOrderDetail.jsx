import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Phone, Package, Navigation } from "lucide-react";
import RiderLayout from "./RiderLayout";
import VA_Button from "@/components/VAComponents/VA_Button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDeliveryStatus } from "@/hooks/CloudKitchen/useDeliveryStatus";
import { useRiderTaskDetail } from "@/hooks/CloudKitchen/useRiderOrderDetail";

const RiderOrderDetail = () => {
  //   {
  //     "taskId": "69308b869320e21246606295",
  //     "orderId": "69308b789320e21246606274",
  //     "orderNumber": "ORD-1764789112207-5817",
  //     "bundleName": "5 days meal",
  //     "menuName": "Mon",
  //     "quantity": 1,
  //     "price": 1000,
  //     "deliveryStatus": "pending",
  //     "deliveryAddress": "Domkur, 4G9V+889, Keelavadagarai, Tamil Nadu, 625601, India",
  //     "deliveryLocation": {
  //         "lat": 10.1182639,
  //         "lng": 77.5433906,
  //         "_id": "69308b789320e21246606275"
  //     },
  //     "customer": {
  //         "name": "Ajardeen",
  //         "phone": "1234567890",
  //         "email": "azardevacc@gmail.com"
  //     }
  // }
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { updateStatus, loading: updating } = useDeliveryStatus();
  const { orderData, loading, refetch } = useRiderTaskDetail(taskId, false);
  const [order, setOrder] = useState(null);

  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    refetch();
    orderData;
    console.log("order", order);
    if (!orderData) return;
    console.log("orderData", orderData);

    setOrder(orderData.data.data);
  }, [loading]);

  useEffect(() => {
    if (!order) return;
    setIsAccepted(order.deliveryStatus !== "ready_for_pickup");
  }, [order]);

  const handleAccept = async () => {
    const ok = await updateStatus(taskId, "accept");
    if (ok) {
      setIsAccepted(true);
      refetch(); // 🔥 unlock customer details after accept
      setOrder(orderData.data.data);
    }
  };

  const handleCancel = () => {
    navigate("/cloud-kitchen/rider");
  };

  if (!order) {
    return (
      <RiderLayout>
        <div className="p-4 text-gray-500">Loading...</div>
      </RiderLayout>
    );
  }
  const formatAddress = (addr) => {
    if (!addr) return "Address not available";

    return [
      addr.label && addr.label.toUpperCase(),
      addr.street1,
      addr.street2,
      addr.city,
      addr.state,
      addr.pinCode,
      addr.country,
    ]
      .filter(Boolean)
      .join(", ");
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

          {isAccepted && order.customer != null ? (
            <>
              <p className="font-semibold text-lg">{order.customer.name}</p>

              <a
                href={`tel:${order.customer.phone}`}
                className="flex flex-col items-start gap-1 text-base text-gray-700"
              >
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-black" /> Phone
                </span>
                {order.customer.phone}
              </a>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Accept order to view customer details
            </p>
          )}
          <p className="flex flex-col items-start gap-1 text-base text-gray-700">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-black" /> Address
            </span>

            <span className="leading-6">
              {formatAddress(order.deliveryAddress)}
            </span>

            {order.deliveryAddress?.deliveryNotes && (
              <span className="text-sm text-gray-500 mt-1">
                Note: {order.deliveryAddress.deliveryNotes}
              </span>
            )}
          </p>

          <Separator />

          <div className="py-1">
            <h3 className="font-semibold text-base">Package Details</h3>
            <p className="font-semibold text-base">
              bundle: {order.bundleName}
            </p>
            <p className="font-semibold text-base">Menu: {order.menuName}</p>
            <p className="text-sm">Qty: {order.quantity}</p>
            <div className="flex justify-between py-2">
              <div>
                <p className="text-sm">Payment: </p>
               <p className="text-sm capitalize">{order.paymentStatus}</p>
                
              </div>
              <div>
                <p className="text-sm">Order Status:</p>
               <p className="text-sm capitalize">{order.deliveryStatus}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer Action Buttons */}
        <div className="min-h-20 border-t-1 shadow-2xl fixed bottom-0 right-0 px-5 w-full items-center flex justify-end bg-white gap-3">
          <VA_Button variant="outline" onClick={handleCancel}>
            Cancel
          </VA_Button>

          {!isAccepted ? (
            <VA_Button
              onClick={handleAccept}
              className="p-6 rounded-full"
              loading={updating}
            >
              Accept Order
            </VA_Button>
          ) : (
            <VA_Button
              icon={<Navigation />}
              iconPosition="right"
              className="p-6 rounded-full min-w-50"
              onClick={() =>
                navigate(`/cloud-kitchen/rider/task/${taskId}/track`)
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
