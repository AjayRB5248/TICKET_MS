import axios from 'axios';
import { BASE_URL } from 'src/config-global';
import { getAccessToken, useRefreshToken } from './token-management';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // 'Authorization': `Bearer ${accessToken}`,
    'Content-Type': undefined,
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    } catch (error) {
      console.error('Error handling token expiry:', error);
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
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (error.response.message === 'Expired/Invalid Token') {
        // message needs to change later
        try {
          const token = await useRefreshToken();
          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          throw refreshError;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    sendOTP: '/auth/generate-otp',
    verifyOTP: '/auth/verify-otp',
    refreshToken: '/auth/refresh-tokens',
    sendEmailVerification: 'auth/send-verification-email',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password',
    logout: '/auth/logout',
  },
  events: {
    list: (queryParameters = {}) => {
      let url = '/events/fetch-events';
      const params = new URLSearchParams(queryParameters).toString();
      if (params) {
        url += `?${params}`;
      }
      return url;
    },
    create: '/events/add-new-event',
    update: (id: string) => `/event/${id}`,
    details: (id: any) => `/events/${id}`,
    remove: (id: string) => `/event/${id}/disable`,
  },
};
