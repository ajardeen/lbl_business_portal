import { Menu } from "lucide-react";
import OrderTrackerCard from "./components/OrderTrackerCard";
import { useKitchens } from "@/hooks/CloudKitchen/useKitchen";
import KitchenLayout from "./KitchenLayout";

function KitchenDisplayScreen() {
  const { data: kitchenOrders = [], isLoading } = useKitchens();

  const formattedOrders = kitchenOrders.map((o) => ({
    id: o._id ?? "--",
    customer: o.customerName ?? "Unknown",
    type: o.bundleName ?? "Bundle",
    due: o.deliveryDate ? new Date(o.deliveryDate).toLocaleTimeString() : "--",
    items: o.items ?? [],
    totalPrepTime: o.totalPrepTime ?? 10,
    status: o.status,
  }));
  return (
    <KitchenLayout>
      <div className="min-h-screen bg-blue-50/95 flex flex-col">
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
    </KitchenLayout>
  );
}

export default KitchenDisplayScreen;
