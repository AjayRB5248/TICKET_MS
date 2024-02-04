"use client"

import { queryClient } from "src/lib/queryClient";
import AuthService from "src/services/auths";
import { useMutation } from "@tanstack/react-query";
import jwt, { JwtPayload } from "jsonwebtoken";

export const storeTokens = (accessToken: string, refreshToken: string, userData?: {}) => {
  queryClient.setQueryData(["accessToken"], accessToken);
  queryClient.setQueryData(["refreshToken"], refreshToken);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  if (userData && Object.keys(userData).length > 0) {
    queryClient.setQueryData(["user"], userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

export const getAccessToken = (): string | null => {
  return queryClient.getQueryData<string>(["accessToken"]) || localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return queryClient.getQueryData<string>(["refreshToken"]) || localStorage.getItem("refreshToken");
};

export const getUserData = (): any => {
  return queryClient.getQueryData<string>(["user"]) || localStorage.getItem("user");
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  queryClient.removeQueries(["accessToken"]);
  queryClient.removeQueries(["refreshToken"]);
  queryClient.removeQueries(["user"]);
};

export const useRefreshToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) throw new Error("No refresh token available");

  const response = await AuthService.refreshToken({ refreshToken }).then((res) => res.data);

  storeTokens(response.access.token, response.refresh.token);

  return response.access.token;
};

export const checkTokenExpiry = async () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    const decodedToken = jwt.decode(accessToken) as JwtPayload;

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken && (decodedToken.exp ?? 0) - currentTime < 300) {
      await useRefreshToken();
    }
  }
};
