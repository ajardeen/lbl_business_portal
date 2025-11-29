import API from "@/configs/axios";

const endpoint = "/kitchen";

export const fetchKitchenOrder = async () => {
  const { data } = await API.get(endpoint);
  console.log("kitchen data ",data);
  
  return data.data;
};
