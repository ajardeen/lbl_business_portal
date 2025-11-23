import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  fetchOrganizationsById,
} from "@/services/Organization/organizationService";

export const useOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: fetchOrganizations,
    staleTime: Infinity,
  });

export const useOrganizationById = (id) =>
  useQuery({
    queryKey: ["organization", id],
    queryFn: () => fetchOrganizationsById(id),
    staleTime: Infinity,
  });


export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => {
      const promise = createOrganization(payload);
      toast.promise(promise, {
        loading: "Registering organization...",
        success: "Organization registered successfully!",
        error: (err) => err?.response?.data?.message || "Failed to register",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["organizations"]),
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => {
      const promise = updateOrganization({ id, payload });
      toast.promise(promise, {
        loading: "Updating organization...",
        success: "Organization updated successfully!",
        error: (err) => err?.response?.data?.message || "Failed to update",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["organizations"]),
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      const promise = deleteOrganization(id);
      toast.promise(promise, {
        loading: "Deleting organization...",
        success: "Organization deleted successfully!",
        error: (err) => err?.response?.data?.message || "Failed to delete",
      });
      return promise;
    },
    onSuccess: () => queryClient.invalidateQueries(["organizations"]),
  });
};
