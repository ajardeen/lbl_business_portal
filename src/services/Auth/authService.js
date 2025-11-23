import API from "@/configs/axios";

const endpoint = "/auth";

// SIGNUP
export const signupAccount = async (payload) => {

  
  const { data } = await API.post(`${endpoint}/signup`, payload);
  return data;
};

// LOGIN
export const loginAccount = async (payload) => {
  const { data } = await API.post(`${endpoint}/login`, payload);
  return data;
};
