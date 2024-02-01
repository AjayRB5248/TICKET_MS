import axios from "axios";
import { BASE_URL } from "src/config-global";
import AuthService from "src/services/auths";

console.log(BASE_URL, " process.env.BASE_URL======");
const accessToken = localStorage.getItem('accessToken')

console.log({accessToken})

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': undefined,
  }
});

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   function(config) {
//     // Retrieve the accessToken from local storage
//     const accessToken = localStorage.getItem('accessToken');
    
//     // If the token exists, add it to the request's Authorization header
//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }

//     return config;
//   }, 
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const token = await AuthService.refreshToken();
//       if (token) {
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         return axiosInstance(originalRequest);
//       }
//     }
//     return Promise.reject((error.response && error.response.data) || "Something went wrong");
//   }
// );

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = "access-token";
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     config.headers["Content-Type"] = "application/json";
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    sendOTP: "/auth/generate-otp",
    verifyOTP: "/auth/verify-otp",
    refreshToken: "/auth/refresh",
    sendEmailVerification: "auth/send-verification-email",
    forgotPassword: "auth/forgot-password",
    resetPassword: "auth/reset-password",
    logout: "/auth/logout",
  },
  events: {
    list: (queryParameters = {}) => {
      let url = "/events/fetch-events";
      const params = new URLSearchParams(queryParameters).toString();
      if (params) {
        url += `?${params}`;
      }
      return url;
    },
    create: "/events/add-new-event",
    update: (id: string) => `/event/${id}`,
    details: (id: any) => `/events/${id}`,
    remove: (id: string) => `/event/${id}/disable`,
  },
};
