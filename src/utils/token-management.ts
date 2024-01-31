import { queryClient } from "src/lib/queryClient";
import AuthService from "src/services/auths";
import { useMutation } from "@tanstack/react-query";
import jwt, { JwtPayload } from "jsonwebtoken";

export const storeTokens = (accessToken: string, refreshToken: string, userData?: {}) => {
  queryClient.setQueryData(["accessToken"], accessToken);
  queryClient.setQueryData(["refreshToken"], refreshToken);
  queryClient.setQueryData(["user"], userData);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(userData));
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

export const useRefreshToken = () => {
  return useMutation(async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await AuthService.refreshToken({ refreshToken }).then((res) => res.data.tokens);
    console.log(response, "response====refresh tokens");

    storeTokens(response.access.token, response.refresh.token);

    return response.access.token;
  });
};

export const checkTokenExpiry = async () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    const decodedToken = jwt.decode(accessToken) as JwtPayload;
    console.log(decodedToken, "decodedToken===");
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token is close to expiration (e.g., within the next 5 minutes)
    if (decodedToken && (decodedToken.exp ?? 0) - currentTime < 300) {
      // Token is close to expiration or has already expired, refresh it
      await useRefreshToken();
    }
  }
};
