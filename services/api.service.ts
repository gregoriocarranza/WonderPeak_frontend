import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://wonderpeak.uade.susoft.com.ar/api";

// Funciones auxiliares
const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token");
};

const getHeaders = async (): Promise<HeadersInit> => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getUsers = async (query?: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/users?query=${query}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Error obteniendo usuarios");
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Funciones de usuarios
export const getUserById = async (userId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Error obteniendo usuario");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
