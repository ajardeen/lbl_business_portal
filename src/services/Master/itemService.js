import API from "@/configs/axios";

const endpoint = "/items";

export const fetchItems = async () => {
  const { data } = await API.get(endpoint);
  return data.data;
};

export const createItem = async (payload) => {
  const { data } = await API.post(endpoint, payload);
  return data;
};

export const updateItem = async ({ id, payload }) => {
  const { data } = await API.put(`${endpoint}/${id}`, payload);
  return data;
};

export const deleteItem = async (id) => {
  const { data } = await API.delete(`${endpoint}/${id}`);
  return data;
};
