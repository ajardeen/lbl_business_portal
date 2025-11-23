import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", //backend url
});

let interceptorId = null;

export const setupAxiosInterceptor = ({ organizationId, branchId }) => {

  // Eject the old interceptor to avoid duplicates
  if (interceptorId !== null) {
    API.interceptors.request.eject(interceptorId);
  }

  interceptorId = API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (organizationId) config.headers["X-Organization-Id"] = organizationId;
    if (branchId) config.headers["X-Branch-Id"] = branchId;
    return config;
  });
};

export default API;
