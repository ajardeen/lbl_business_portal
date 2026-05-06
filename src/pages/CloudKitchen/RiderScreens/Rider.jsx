import { useMemo } from "react";
import { MapPin, Package, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RiderLayout from "./RiderLayout";
import { useRiderJobs } from "@/hooks/CloudKitchen/useRiderJobs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


const Rider = () => {
  const { orders, loading } = useRiderJobs();
  const navigate = useNavigate();


  const pendingOrders = useMemo(
    () => orders?.filter((o) => o.deliveryStatus !== "delivered") || [],
    [orders]
  );

  const completedOrders = useMemo(
    () => orders?.filter((o) => o.deliveryStatus === "delivered") || [],
    [orders]
  );

  const OrderCard = ({ order, variant = "pending" }) => (
    <div
      key={order.taskId}
      onClick={() => navigate(`/cloud-kitchen/rider/order/${order.taskId}`)}
      className="
        bg-white dark:bg-gray-800
        shadow-sm hover:shadow-md
        border border-transparent dark:border-gray-700
        rounded-2xl p-4
        flex flex-col gap-3
        cursor-pointer transition-all duration-200
      "
    >
      <div className="flex gap-5 justify-between">
        <h3 className="text-xs text-muted-foreground dark:text-gray-400">
          #{order.jobCode}
        </h3>
        <span
          className={`text-xs px-3 py-1 h-fit capitalize rounded-sm ${
            variant === "pending"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
              : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
          }`}
        >
          {order.deliveryStatus}
        </span>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300 flex flex-col gap-1">
        <p className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          {order.menuName}
        </p>
        <p className="flex items-center gap-2 max-w-md">
          <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />
          {order.deliveryAddress.street1}, {order.deliveryAddress.city},{" "}
          {order.deliveryAddress.pinCode}
        </p>
      </div>
    </div>
  );

  return (
    <RiderLayout>
      <div className="w-full p-4 space-y-4 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">

     <div className="w-full text-center  top-14 left-0 bg-blue-500 hidden lg:block">This Screen Support only mobile view</div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-3 dark:bg-gray-800 dark:text-gray-300">
            <TabsTrigger
              value="pending"
              className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Pending Orders
            </h2>
            {pendingOrders.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No pending orders found.
              </p>
            )}
            <div className="flex flex-col gap-3">
              {pendingOrders.map((order) => (
                <OrderCard key={order.taskId} order={order} variant="pending" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Completed Orders
            </h2>
            {completedOrders.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No completed orders found.
              </p>
            )}
            <div className="flex flex-col gap-3">
              {completedOrders.map((order) => (
                <OrderCard key={order.taskId} order={order} variant="completed" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RiderLayout>
  );
};

export default Rider;