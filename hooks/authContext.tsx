import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "@/types/interfaces";
import { View, Text } from "react-native";
import i18n from "@/languages";
import { Colors } from "@/constants/Colors";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  userInfo: string | null;
  userMe: (user: UserInfo) => void;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) setToken(savedToken);

      setLoading(false);
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

  const userMe = async (user: UserInfo) => {
    const userString = JSON.stringify(user);
    setUserInfo(userString);
    await AsyncStorage.setItem("user", userString);
  };

  const value: AuthContextType = {
    token,
    isAuthenticated: !!token,
    userMe,
    login,
    logout,
    userInfo,
  };

  if (loading) {
    return (
      <View className="items-center justify-center" style={{ height: "100%" }}>
        <Text
          className="font-pbold"
          style={{
            fontSize: 32,
            color: Colors.gray,
          }}
        >{`${i18n.t("loading")}...`}</Text>
      </View>
    );
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
