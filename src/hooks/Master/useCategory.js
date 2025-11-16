// src/hooks/Master/useCategory.js
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
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created successfully!");
      queryClient.invalidateQueries(["categorys"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to create category");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries(["categorys"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to update category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries(["categorys"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to delete category");
    },
  });
};
