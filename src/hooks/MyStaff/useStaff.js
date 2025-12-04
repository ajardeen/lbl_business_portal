import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchStaffs,
  createStaff,
  updateStaff,
  deleteStaff,
  suspendStaff,
} from "@/services/MyStaff/staffService";
import { toast } from "sonner";

export const useStaffs = () =>
  useQuery({
    queryKey: ["staffs"],
    queryFn: fetchStaffs,
    staleTime: Infinity,
  });

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      const promise = createStaff(payload);
      toast.promise(promise, {
        loading: "Creating staff...",
        success: "Staff created successfully!",
        error: "Failed to create staff",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["staffs"]),
  });
};

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => {
      const promise = updateStaff({ id, payload });
      toast.promise(promise, {
        loading: "Updating staff...",
        success: "Staff updated successfully!",
        error: "Failed to update staff",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["staffs"]),
  });
};

export const useSuspendStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: suspendStaff,
    onSuccess: () => {
      toast.success("Staff suspended successfully!");
      queryClient.invalidateQueries(["staffs"]);
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      toast.success("Staff deleted successfully!");
      queryClient.invalidateQueries(["staffs"]);
    },
  });
};
