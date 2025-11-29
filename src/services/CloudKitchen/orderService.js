import API from "@/configs/axios";

const endpoint = "/orders/by-org-branch";

export const fetchOrders = async () => {
  const { data } = await API.get(endpoint);
  return data.data;
};

export const orderApprove = async (orderId)=>{
  const { data } = await API.put(`orders/approve/${orderId}`);
  return data.data;
}
