import axiosInstance, { endpoints } from "src/utils/axios";

const AuthService = {
  register: (data: any) => axiosInstance.post(endpoints.auth.register, data),
  login: (data: { email: string; password: string }) => axiosInstance.post(endpoints.auth.login, data),
  sendOTP: (data: any) => axiosInstance.post(endpoints.auth.sendOTP, data),
  verifyOTP: (data: any) => axiosInstance.post(endpoints.auth.verifyOTP, data),
  refreshToken: (data: { refreshToken: string }) => axiosInstance.post(endpoints.auth.refreshToken, data),
  sendEmailVerification: (data: any) => axiosInstance.post(endpoints.auth.sendEmailVerification, data),
  forgotPassword: (data: { email: string; tokenType: string }) =>
    axiosInstance.post(endpoints.auth.forgotPassword, data),
  resetPassword: (data: { otp: string; password: string; email: string }) =>
    axiosInstance.post(endpoints.auth.resetPassword, data),
  logout: (data: { refreshToken: string }) => axiosInstance.post(endpoints.auth.logout, data),
};

export default AuthService;
