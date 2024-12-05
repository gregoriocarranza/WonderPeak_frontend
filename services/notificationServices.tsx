import { BASE_URL, getHeaders } from "./api.service";

const BACK_URL = `${BASE_URL}/auth`;

export const postToken = async (pushToken: string) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BACK_URL}/push-token`, {
      method: "POST",
      headers,
      body: JSON.stringify({ token: pushToken }),
    });

    if (!response.ok) {
      throw new Error("Error guardando el tokende las push notification");
    }
    return await response.json();
  } catch (error) {
    console.error("Error guardando el tokende las push notification: ", error);
    throw error;
  }
};
