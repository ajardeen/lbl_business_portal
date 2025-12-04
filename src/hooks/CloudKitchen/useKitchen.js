import { fetchKitchenOrder } from "@/services/CloudKitchen/kitchenService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "@/configs/socket";

export const useKitchens = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("kitchen:update", () => {
      console.log("🔄 Kitchen updated — refetch triggered");
      queryClient.invalidateQueries(["kitchens"]);
    });

    return () => socket.off("kitchen:update");
  }, []);

  return useQuery({
    queryKey: ["kitchens"],
    queryFn: fetchKitchenOrder,
    refetchOnReconnect: true,
  });
};
