import { BASE_URL, getHeaders } from "./api.service";

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

export const getUserFollowers = async (userId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/users/${userId}/followers`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Error obteniendo posts de usuario");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user followers:", error);
    throw error;
  }
};

export const getUserFollowing = async (userId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/users/${userId}/following`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Error obteniendo posts de usuario");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user followers:", error);
    throw error;
  }
};

export const getUserFavorites = async (userId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/users/${userId}/favorites`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Error obteniendo posts de usuario");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user followers:", error);
    throw error;
  }
};
