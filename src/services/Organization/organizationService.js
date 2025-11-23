import API from "@/configs/axios";

const endpoint = "/organizations";

export const createOrganization = async (payload) => {
  const { data } = await API.post(endpoint, payload);
  return data;
};

export const fetchOrganizationsById = async () => {
  const { data } = await API.get(endpoint);
  return data.data;
};
export const fetchOrganizations = async () => {
  const { data } = await API.get(endpoint);
  return data.data;
};

export const updateOrganization = async ({ id, payload }) => {
  const { data } = await API.put(`${endpoint}/${id}`, payload);
  return data;
};

export const deleteOrganization = async (id) => {
  const { data } = await API.delete(`${endpoint}/${id}`);
  return data;
};
