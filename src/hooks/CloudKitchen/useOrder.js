import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/services/CloudKitchen/orderService";

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: Infinity,
  });
