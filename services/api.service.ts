import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "https://wonderpeak.uade.susoft.com.ar/api";

// Funciones auxiliares
const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token");
};

export const getHeaders = async (): Promise<HeadersInit> => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getUserInfo = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("user");
};