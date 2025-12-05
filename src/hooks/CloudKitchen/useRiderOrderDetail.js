import { useQuery } from "@tanstack/react-query";
import { getRiderTaskDetail } from "@/services/CloudKitchen/riderService";

export const useRiderTaskDetail = (taskId, enabled = true) => {
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["riderTaskDetail", taskId],
    queryFn: async () => {
      const res = await getRiderTaskDetail(taskId);
      console.log("calling",res);
      return res;
    },
    onError: (err) => {
      console.error("Error fetching rider task detail", err);
    },
    enabled,
  });

  return { orderData: data, loading: isLoading, refetch };
};
