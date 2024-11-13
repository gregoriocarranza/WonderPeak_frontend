import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "@/types/interfaces";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  userMe: (user: string) => void;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) setToken(savedToken);
    };

    const loadUserMe = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) setUserInfo(savedUser);
    };

    loadToken();
    loadUserMe();

  }, [userInfo, token]);

  const login = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem("token", newToken);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

  };

  const userMe = async (user: any) => {
    setUserInfo(user);
    await AsyncStorage.setItem("user", JSON.stringify(user));
  };

  const value: AuthContextType = {
    token,
    isAuthenticated: !!token,
    userMe,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
