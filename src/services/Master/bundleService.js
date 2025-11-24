import API from "@/configs/axios";


const endpoint = "/bundles";


export const fetchBundles = async () => {
const { data } = await API.get(endpoint);
return data.data;
};


export const createBundle = async (payload) => {
const { data } = await API.post(endpoint, payload);
return data;
};


export const updateBundle = async ({ id, payload }) => {
const { data } = await API.put(`${endpoint}/${id}`, payload);
return data;
};


export const deleteBundle = async (id) => {
const { data } = await API.delete(`${endpoint}/${id}`);
return data;
};