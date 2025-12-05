import API from "@/configs/axios";

export const getRiderJobs = async () => {
  return await API.get("orders/rider/jobs");
};

export const getRiderTaskDetail = async (taskId) => {
  console.log("calling");

  return await API.get(`/orders/rider/task/${taskId}`);
};

export const updateDeliveryStatus = async (taskId, action, riderId) => {
  return await API.post(`/orders/${taskId}/rider/job/update`, {
    action,
    riderId: riderId || undefined,
  });
};
