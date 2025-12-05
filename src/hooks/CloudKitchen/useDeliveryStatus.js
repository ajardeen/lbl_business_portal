import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeliveryStatus } from "@/services/CloudKitchen/riderService";
import { useAuth } from "@/context/AuthContext";


export const useDeliveryStatus = () => {
  const queryClient = useQueryClient();
  const { account } = useAuth();
  const riderId = account?._id;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ orderId, action }) => {
      return await updateDeliveryStatus(orderId, action, riderId);
    },
    onSuccess: () => {
      // 🔥 Auto refresh the rider jobs after status change
      queryClient.invalidateQueries(["riderJobs"]);
    },
    
  });

  const updateStatus = async (orderId, action) => {
    try {
      await mutateAsync({ orderId, action });
      return true;
    } catch (err) {
      console.error("Delivery status update failed", err);
      return false;
    }
  };

  return { updateStatus, loading: isPending };
};
