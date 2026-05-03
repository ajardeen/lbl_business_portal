import { useQuery } from "@tanstack/react-query";
import { getRiderJobs } from "@/services/CloudKitchen/riderService";

export const useRiderJobs = () => {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["riderJobs"],
    queryFn: async () => {
      const res = await getRiderJobs();
      return res.data.data; // only return the list
    },
    refetchOnWindowFocus: true, // auto refresh when rider returns to screen
    staleTime: 1000 * 10, // 10 sec stale time
  });

  return {
    orders: data || [],
    loading: isLoading || isRefetching,
    refetch,
  };
};
