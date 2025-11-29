import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchOrders,
  orderApprove,
} from "@/services/CloudKitchen/orderService";
import { toast } from "sonner";

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: Infinity,
  });

export const useOrderApprove = () =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      const promise = orderApprove(id);
      toast.promise(promise, {
        loading: "Order Updating...",
        success: "Order Approved !",
        error: (err) => err?.response?.data?.message || "Failed to Approve",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["orders"]),
  });

}
