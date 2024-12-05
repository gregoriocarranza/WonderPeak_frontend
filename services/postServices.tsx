import { BASE_URL, getHeaders } from "./api.service";

export const getUserPosts = async (userId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/posts/user/${userId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Error obteniendo posts de usuario");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts by user id:", error);
    throw error;
  }
};

export const getFavoritesPosts = async () => {
  try {
    const headers = await getHeaders();

    const response = await fetch(`${BASE_URL}/posts/favorites`, {
      method: "GET",
      headers,
    });

    if (!response.ok)
      throw new Error("Error obteniendo posts favoritos de usuario");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user favorites posts:", error);
    throw error;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Error obteniendo detalle de post");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts by post id:", error);
    throw error;
  }
};

export const handlePostFavorite = async (postId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/posts/${postId}/favorite`, {
      method: "PUT",
      headers,
    });

    if (!response.ok)
      throw new Error("Error al agregar/sacar post de favorito");
    return await response.json();
  } catch (error) {
    console.error("Error to handle post favorite:", error);
    throw error;
  }
};

export const handlePostLike = async (postId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: "PUT",
      headers,
    });

    if (!response.ok) throw new Error("Error al agregar/sacar like de post");
    return await response.json();
  } catch (error) {
    console.error("Error to handle like in post:", error);
    throw error;
  }
};
