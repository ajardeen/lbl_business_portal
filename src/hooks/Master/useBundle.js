import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchBundles,
  createBundle,
  updateBundle,
  deleteBundle,
  fetchBundleById,
} from "@/services/Master/bundleService";

export const useBundles = () =>
  useQuery({
    queryKey: ["bundles"],
    queryFn: fetchBundles,
    staleTime: Infinity,
  });
  export const useBundleById = (id) =>
  useQuery({
    queryKey: ["bundles", id],
    queryFn: () => fetchBundleById(id),
    // Only run the query if an ID is provided
    enabled: !!id, 
    staleTime: Infinity,
  });

export const useCreateBundle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      const promise = createBundle(payload);
      toast.promise(promise, {
        loading: "Creating bundle...",
        success: "Bundle created successfully!",
        error: (err) => err?.response?.data?.message || "Failed to create",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["bundles"]),
  });
};

export const useUpdateBundle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => {
      const promise = updateBundle({ id, payload });
      toast.promise(promise, {
        loading: "Updating bundle...",
        success: "Bundle updated successfully!",
        error: (err) => err?.response?.data?.message || "Failed to update",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["bundles"]),
  });
};

export const useDeleteBundle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      const promise = deleteBundle(id);
      toast.promise(promise, {
        loading: "Deleting bundle...",
        success: "Bundle deleted successfully!",
        error: (err) => err?.response?.data?.message || "Failed to delete",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["bundles"]),
  });
};
