import { fetchKitchenOrder } from "@/services/CloudKitchen/kitchenService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useKitchens = () =>
  useQuery({
    queryKey: ["kitchens"],
    queryFn: fetchKitchenOrder,
    staleTime: Infinity,
    refetchOnReconnect: true,
    retryDelay: 1000,
  });
