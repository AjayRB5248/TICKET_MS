import axiosInstance, { endpoints } from "src/utils/axios";

const AuthService = {
  register: (data: any) => axiosInstance.post(endpoints.auth.register, data),
  login: (data: { email: string; otp: string }) => axiosInstance.post(endpoints.auth.login, data),
  sendOTP: (data: any) => axiosInstance.post(endpoints.auth.sendOTP, data),
  verifyOTP: (data: any) => axiosInstance.post(endpoints.auth.verifyOTP, data),
  refreshToken: () => axiosInstance.post(endpoints.auth.refreshToken),
  sendEmailVerification: (data: any) => axiosInstance.post(endpoints.auth.sendEmailVerification, data),
};

export default AuthService;
