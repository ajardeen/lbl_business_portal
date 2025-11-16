import API from "../../configs/axios";

const endpoint = "/categories";

export const fetchCategorys = async () => {
  const { data } = await API.get(endpoint);
  return data.data;
};

export const createCategory = async (payload) => {
  const { data } = await API.post(endpoint, payload);
  return data;
};

export const updateCategory = async ({ id, payload }) => {
  const { data } = await API.put(`${endpoint}/${id}`, payload);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await API.delete(`${endpoint}/${id}`);
  return data;
};