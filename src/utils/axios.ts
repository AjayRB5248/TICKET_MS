import axios from "axios";
import { BASE_URL } from "src/config-global";
import AuthService from "src/services/auths";

console.log(BASE_URL, " process.env.BASE_URL======");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

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

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = "access-token";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
    list: "/events",
    create: "/events/add-new-event",
    update: (id: string) => `/event/${id}`,
    details: (id: string) => `/event/${id}`,
    remove: (id: string) => `/event/${id}/disable`,
  },
};
