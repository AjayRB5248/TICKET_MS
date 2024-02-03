import axios from "axios";
import { ADMIN_LOGIN_PATH, BASE_URL, USER_LOGIN_PATH } from "src/config-global";
import { checkTokenExpiry, getAccessToken, getUserData, useRefreshToken } from "./token-management";
import { useRouter, useSearchParams } from "src/routes/hook";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      config.headers["Content-Type"] = "application/json";
      return config;
    } catch (error) {
      console.error("Error handling token expiry:", error);
      throw error;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await useRefreshToken();
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        throw refreshError;
      }
    }
    return Promise.reject((error.response && error.response.data) || "Something went wrong");
  }
);

export default axiosInstance;

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    sendOTP: "/auth/generate-otp",
    verifyOTP: "/auth/verify-otp",
    refreshToken: "/auth/refresh-tokens",
    sendEmailVerification: "auth/send-verification-email",
    forgotPassword: "auth/forgot-password",
    resetPassword: "auth/reset-password",
    logout: "/auth/logout",
  },
  events: {
    list: "/events/fetch-events",
    create: "/events/add-new-event",
    update: (id: string) => `/event/${id}`,
    details: (id: string) => `/event/${id}`,
    remove: (id: string) => `/event/${id}/disable`,
  },
};
