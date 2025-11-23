import API from "@/configs/axios";

const endpoint = "/branches";

export const fetchBranches = async () => {
  const { data } = await API.get(endpoint);
  return data.data;
};

export const createBranch = async (payload) => {
  const { data } = await API.post(endpoint, payload);
  return data;
};

export const updateBranch = async ({ id, payload }) => {
  const { data } = await API.put(`${endpoint}/${id}`, payload);
  return data;
};

export const deleteBranch = async (id) => {
  const { data } = await API.delete(`${endpoint}/${id}`);
  return data;
};
