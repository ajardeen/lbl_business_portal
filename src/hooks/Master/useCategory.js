import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchCategorys,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/Master/categoryService";

export const useCategorys = () =>
  useQuery({
    queryKey: ["categorys"],
    queryFn: fetchCategorys,
    staleTime: Infinity,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => {
      const promise = createCategory(payload);

      toast.promise(promise, {
        loading: "Creating category...",
        success: "Category created successfully!",
        error: (err) =>
          err?.response?.data?.message || "Failed to create category",
      });

      return promise;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["categorys"]);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => {
      const promise = updateCategory({ id, payload });

      toast.promise(promise, {
        loading: "Updating category...",
        success: "Category updated successfully!",
        error: (err) =>
          err?.response?.data?.message || "Failed to update category",
      });

      return promise;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["categorys"]);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      const promise = deleteCategory(id);

      toast.promise(promise, {
        loading: "Deleting category...",
        success: "Category deleted successfully!",
        error: (err) =>
          err?.response?.data?.message || "Failed to delete category",
      });

      return promise;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["categorys"]);
    },
  });
};
