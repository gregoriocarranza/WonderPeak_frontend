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
    console.error("Error fetching user posts:", error);
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

    if (!response.ok) throw new Error("Error obteniendo posts de usuario");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user posts:", error);
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

    if (!response.ok) throw new Error("Error obteniendo posts de usuario");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user posts:", error);
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

    if (!response.ok) throw new Error("Error obteniendo posts de usuario");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};
