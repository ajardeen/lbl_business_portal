import { useMemo } from "react";
import { MapPin, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RiderLayout from "./RiderLayout";
import { useRiderJobs } from "@/hooks/CloudKitchen/useRiderJobs";

// ✅ shadcn Tabs import
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Rider = () => {
  const { orders, loading } = useRiderJobs();
  const navigate = useNavigate();

  // Separate filtered groups
  const pendingOrders = useMemo(
    () => orders?.filter((o) => o.deliveryStatus === "pending") || [],
    [orders]
  );

  const completedOrders = useMemo(
    () => orders?.filter((o) => o.deliveryStatus === "delivered") || [],
    [orders]
  );

  return (
    <RiderLayout>
      <div className="sm:max-w-96 p-4 space-y-4 bg-gray-50 min-h-screen">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-3">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* Pending Orders */}
          <TabsContent value="pending">
            <h2 className="text-lg font-semibold mb-2">Pending Orders</h2>

            {pendingOrders.length === 0 && (
              <p className="text-sm text-gray-500">No pending orders found.</p>
            )}
            <div className="flex flex-col gap-3">
              {pendingOrders.map((order) => (
                <div
                  key={order.taskId}
                  onClick={() =>
                    navigate(`/cloud-kitchen/rider/order/${order.taskId}`)
                  }
                  className="bg-white shadow-sm rounded-2xl p-4  flex flex-col gap-3 cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex gap-5 justify-between">
                    <h3 className="text-xs text-muted-foreground">
                      #{order.orderNumber}
                    </h3>
                    <span className="text-xs px-3 py-1 h-fit capitalize rounded-sm bg-yellow-100 text-yellow-700">
                      {order.deliveryStatus}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 flex flex-col gap-1">
                    <p className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-500" />{" "}
                      {order.menuName}
                    </p>
                    <p className="flex items-center gap-2 max-w-md">
                      <MapPin className="h-4 w-4 text-gray-500 text-wrap" />{" "}
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Completed Orders */}
          <TabsContent value="completed">
            <h2 className="text-lg font-semibold mb-2">Completed Orders</h2>

            {completedOrders.length === 0 && (
              <p className="text-sm text-gray-500">
                No completed orders found.
              </p>
            )}
            <div className="flex flex-col gap-3">
              {completedOrders.map((order) => (
                <div
                  key={order.taskId}
                  onClick={() =>
                    navigate(`/cloud-kitchen/rider/order/${order.taskId}`)
                  }
                  className="bg-white shadow-sm rounded-2xl p-4 flex flex-col gap-3 cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex gap-5 justify-between">
                    <h3 className="text-xs text-muted-foreground">
                      #{order.orderNumber}
                    </h3>
                    <span className="text-xs px-3 py-1 h-fit capitalize rounded-sm bg-green-100 text-green-700">
                      {order.deliveryStatus}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 flex flex-col gap-1">
                    <p className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-500" />{" "}
                      {order.menuName}
                    </p>
                    <p className="flex items-center gap-2 max-w-md">
                      <MapPin className="h-4 w-4 text-gray-500 text-wrap" />{" "}
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RiderLayout>
  );
};

export default Rider;
