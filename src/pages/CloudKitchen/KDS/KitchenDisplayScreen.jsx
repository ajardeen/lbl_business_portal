import { Menu } from "lucide-react";
import OrderTrackerCard from "./components/OrderTrackerCard";
import { useKitchens } from "@/hooks/CloudKitchen/useKitchen";

function KitchenDisplayScreen() {
  const { data: kitchenOrders = [], isLoading } = useKitchens();

  const formattedOrders = kitchenOrders.map((o) => ({
    id: o._id ?? "--",
    customer: o.customerName ?? "Unknown",
    type: o.bundleName ?? "Bundle",
    due: o.deliveryDate ? new Date(o.deliveryDate).toLocaleTimeString() : "--",
    items: o.items ?? [],
    totalPrepTime: o.totalPrepTime ?? 10,
  }));
  return (
    <div className="min-h-screen bg-blue-50/95 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-2 border-b bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold">Active Orders</h1>
        </div>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleString()}
        </span>
      </header>

      {/* Orders Grid */}
      <main className="p-6 mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto scroll-smooth snap-y snap-mandatory h-[calc(100vh-80px)]">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          formattedOrders.map((order) => (
            <div key={order.id} className="snap-start ">
              <OrderTrackerCard order={order} isLoading={isLoading} />
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default KitchenDisplayScreen;
