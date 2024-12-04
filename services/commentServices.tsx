import { BASE_URL, getHeaders } from "./api.service";

const COMMENTS_URL = `${BASE_URL}/comments`;

export const createComment = async (postId: string, text: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${COMMENTS_URL}/post/${postId}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error("Error creando comentario");
    return await response.json();
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const getPostComments = async (postId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${COMMENTS_URL}/post/${postId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Error obteniendo comentarios");
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) throw new Error("Error eliminando comentario");
    return await response.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
