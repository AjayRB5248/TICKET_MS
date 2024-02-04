// authContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { queryClient } from "src/lib/queryClient";

interface User {
  role: string;
  isEmailVerified: boolean;
  isNumberVerified: boolean;
  name: string;
  email: string;
  mobileNumber: string;
  id: string;
  photoURL: string;
}

interface UserToken {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  register: (userData: User, token: string, refreshToken: string) => void;
  login: (userData: User, token: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Check cache and storage during initialization
  useEffect(() => {
    const cachedUser = queryClient.getQueryData<User>(["user"]);
    const cachedAccessToken = queryClient.getQueryData<string>(["accessToken"]);
    const cachedRefreshToken = queryClient.getQueryData<string>(["refreshToken"]);

    if (cachedUser && cachedAccessToken) {
      setUser(cachedUser);
      setAccessToken(cachedAccessToken);
      setRefreshToken(cachedRefreshToken ?? null);
    } else {
      // Check local storage
      const storedUser = localStorage.getItem("user");
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      setUser(storedUser ? JSON.parse(storedUser) : null);
      setAccessToken(storedAccessToken ?? null);
      setRefreshToken(storedRefreshToken ?? null);
    }
  }, [queryClient]);

  const register = (userData: User, token: string, refreshToken: string) => {
    setUser(userData);
    setAccessToken(token);
    setRefreshToken(refreshToken);
  };

  const login = (userData: User, token: string, refreshToken: string) => {
    setUser(userData);
    setAccessToken(token);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
