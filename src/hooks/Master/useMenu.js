import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchMenus,
  createMenu,
  updateMenu,
  deleteMenu,
} from "@/services/Master/menuService";

export const useMenus = () =>
  useQuery({
    queryKey: ["menus"],
    queryFn: fetchMenus,
    staleTime: Infinity,
  });

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      const promise = createMenu(payload);
      toast.promise(promise, {
        loading: "Creating menu...",
        success: "Menu created successfully!",
        error: (err) => err?.response?.data?.message || "Failed to create",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["menus"]),
  });
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => {
      const promise = updateMenu({ id, payload });
      toast.promise(promise, {
        loading: "Updating menu...",
        success: "Menu updated successfully!",
        error: (err) => err?.response?.data?.message || "Failed to update",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["menus"]),
  });
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      const promise = deleteMenu(id);
      toast.promise(promise, {
        loading: "Deleting menu...",
        success: "Menu deleted successfully!",
        error: (err) => err?.response?.data?.message || "Failed to delete",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["menus"]),
  });
};
