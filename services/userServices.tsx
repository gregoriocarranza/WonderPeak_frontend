import { BASE_URL, getHeaders } from "./api.service";

const USER_URL = `${BASE_URL}/users`;

export const getUsers = async (query?: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${USER_URL}?query=${query}`, {
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
    const response = await fetch(`${USER_URL}/${userId}`, {
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
    const response = await fetch(`${USER_URL}/${userId}/followers`, {
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
    const response = await fetch(`${USER_URL}/${userId}/following`, {
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
    const response = await fetch(`${USER_URL}/${userId}/favorites`, {
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

export const handleUserFavorite = async (userId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${USER_URL}/${userId}/favorites`, {
      method: "PUT",
      headers,
    });

    if (!response.ok)
      throw new Error("Error al agregar/sacar usuario de favorito");
    return await response.json();
  } catch (error) {
    console.error("Error to handle post favorite:", error);
    throw error;
  }
};

export const handleUserFollow = async (userId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${USER_URL}/${userId}/following`, {
      method: "PUT",
      headers,
    });

    if (!response.ok)
      throw new Error("Error al agregar/sacar follow de usuario");
    return await response.json();
  } catch (error) {
    console.error("Error to handle like in post:", error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${USER_URL}/me`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) throw new Error("Error al eliminar la cuenta");
    return await response.json();
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const updateUser = async (formData: FormData) => {
  try {
    const headers = await getHeaders();
    const formDataHeaders = {
      ...headers,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };

    const response = await fetch(`${USER_URL}/me`, {
      method: "PUT",
      headers: formDataHeaders,
      body: formData,
    });

    if (!response.ok) throw new Error("Error al actualizar el usuario");
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const updateUserPassword = async (data: {
  password: string;
  newPassword: string;
}) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${USER_URL}/me/password`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error al actualizar la contraseña");
    return await response.json();
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};
