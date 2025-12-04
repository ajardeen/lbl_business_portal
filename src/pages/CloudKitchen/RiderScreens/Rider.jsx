import VA_Button from "@/components/VAComponents/VA_Button";
import { MapPin, Phone, Package, ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RiderLayout from "./RiderLayout";

const Rider = () => {
  const navigate = useNavigate();

  const orders = [
    {
      _id: "1",
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
      deliveryStatus: "pending",
    },
    {
      _id: "2",
      orderNumber: "ORD12346",
      customer: {
        name: "Amit Sharma",
        phone: "+91 9820312345",
        email: "amit@example.com",
      },
      address: "Flat 302, Sky Towers, Powai, Mumbai",
      bundleName: "Nike Running Shoes",
      price: 4500,
      quantity: 1,
      paymentStatus: "paid",
      deliveryStatus: "ready_for_pickup",
    },
  ];

  return (
    <RiderLayout>

      <div className="sm:max-w-96  p-4 space-y-4 bg-gray-50 min-h-screen">
        <h2 className="text-lg font-semibold mb-2">Pending Orders</h2>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-sm rounded-2xl p-4 flex flex-col gap-3"
          >
            <div className="flex gap-5 justify-between">
              <div>

              <h3 className="font-semibold text-base">#{order.customer.name}</h3>
              <h3 className=" text-xs text-muted-foreground ">#{order.orderNumber}</h3>
              </div>
              <VA_Button
                size="sm"
                label="View"
                icon={<ArrowRightCircle/>}
                onClick={() =>
                  navigate(`/cloud-kitchen/rider/order/${order._id}`)
                }
              />
              {/* <span
                className={`text-xs px-3 py-1 rounded-full ${
                  order.deliveryStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.deliveryStatus.replace(/_/g, " ")}
              </span> */}

            </div>

            <div className="text-sm text-gray-700 flex flex-col gap-1">
              <p className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" /> {order.bundleName}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" /> {order.address}
              </p>
              {/* <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />{" "}
                {order.customer.phone}
              </p> */}
            </div>

            
          </div>
        ))}
      </div>
    </RiderLayout>
   
  );
};

export default Rider;
