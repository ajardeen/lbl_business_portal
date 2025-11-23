import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} from "@/services/Settings/branchService";
import { toast } from "sonner";

// Fetch All
export const useBranches = () =>
  useQuery({
    queryKey: ["branches"],
    queryFn: fetchBranches,
    staleTime: Infinity,
  });

// Create
export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      const promise = createBranch(payload);
      toast.promise(promise, {
        loading: "Creating branch...",
        success: "Branch created successfully!",
        error: (err) => err?.response?.data?.message || "Failed to create",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["branches"]),
  });
};

// Update
export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => {
      const promise = updateBranch({ id, payload });
      toast.promise(promise, {
        loading: "Updating branch...",
        success: "Branch updated successfully!",
        error: (err) => err?.response?.data?.message || "Failed to update",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["branches"]),
  });
};

// Delete
export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      const promise = deleteBranch(id);
      toast.promise(promise, {
        loading: "Deleting branch...",
        success: "Branch deleted successfully!",
        error: (err) => err?.response?.data?.message || "Failed to delete",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["branches"]),
  });
};
