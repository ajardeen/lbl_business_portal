import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
} from "@/services/Master/itemService";
import { toast } from "sonner";

export const useItems = () =>
  useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    catch: Infinity,
    staleTime: Infinity,
  });

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      const promise = createItem(payload);
      toast.promise(promise, {
        loading: "Creating item...",
        success: "Item created successfully!",
        error: (err) => err?.response?.data?.message || "Failed to create",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["items"]),
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => {
      const promise = updateItem({ id, payload });
      toast.promise(promise, {
        loading: "Updating item...",
        success: "Item updated successfully!",
        error: (err) => err?.response?.data?.message || "Failed to update",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["items"]),
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      const promise = deleteItem(id);
      toast.promise(promise, {
        loading: "Deleting item...",
        success: "Item deleted successfully!",
        error: (err) => err?.response?.data?.message || "Failed to delete",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["items"]),
  });
};
