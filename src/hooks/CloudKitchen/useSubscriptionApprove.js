// hooks/Subscription/useSubscriptionApprove.js
import {
  approveSubscriptionApi,
  fetchAdminSubscriptions,
} from "@/services/CloudKitchen/subscription.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAdminSubscriptions = () =>
  useQuery({
    queryKey: ["admin-subscriptions"],
    queryFn: fetchAdminSubscriptions,
    staleTime: Infinity,
  });

export const useSubscriptionApprove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId) => {
      const promise = approveSubscriptionApi(subscriptionId);
      toast.promise(promise, {
        loading: "Approving subscription...",
        success: "Subscription approved successfully!",
        error: (err) =>
          err?.response?.data?.message || "Failed to approve subscription.",
      });
      return promise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-subscriptions"]);
    },
  });
};
