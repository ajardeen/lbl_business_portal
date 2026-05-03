// services/subscription.service.js
import API from "@/configs/axios";

export const approveSubscriptionApi = async (subscriptionId) => {
  const { data } = await API.post(`/subscriptions/${subscriptionId}/approve`);
  return data;
};

export const fetchAdminSubscriptions = async () => {
  const { data } = await API.get("/subscriptions/admin/pending");
  return data.data;
};
