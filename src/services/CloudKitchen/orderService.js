import API from "@/configs/axios";

const endpoint = "/orders";

export const fetchOrders = async () => {
  const { data } = await API.get(endpoint);
  return data.data;
};
