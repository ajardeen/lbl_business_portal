import API from "@/configs/axios";

const endpoint = "/menus";

export const fetchMenus = async () => {
  const { data } = await API.get(endpoint);
  return data.data;
};

export const createMenu = async (payload) => {
  const { data } = await API.post(endpoint, payload);
  return data;
};

export const updateMenu = async ({ id, payload }) => {
  const { data } = await API.put(`${endpoint}/${id}`, payload);
  return data;
};

export const deleteMenu = async (id) => {
  const { data } = await API.delete(`${endpoint}/${id}`);
  return data;
};
