import API from "@/configs/axios";

const endpoint = "/staff";

export const fetchStaffs = async () => {
  const { data } = await API.get(endpoint);
  return data.data;
};

export const createStaff = async (payload) => {
  const { data } = await API.post(endpoint, payload);
  return data;
};

export const updateStaff = async ({ id, payload }) => {
  const { data } = await API.put(`${endpoint}/${id}`, payload);
  return data;
};

export const suspendStaff = async (id) => {
  const { data } = await API.put(`${endpoint}/${id}/suspend`);
  return data;
};

export const deleteStaff = async (id) => {
  const { data } = await API.delete(`${endpoint}/${id}`);
  return data;
};
