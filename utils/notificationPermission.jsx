import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { Alert } from "react-native";

export default async function registerForPushNotificationsAsync() {
  try {
    const projectId =
      process.env.EXPO_PUBLIC_PROJECT_ID ||
      Constants?.expoConfig?.extra?.eas?.projectId;

    if (!projectId) {
      Alert.alert("Project ID not found");
    }
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Error", "No se pudo obtener el token de notificación.");
      return;
    }

    let expoToken = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;

    if (!expoToken) {
      Alert.alert("Error", `Error al obtener el token: ${error.message}`);
    }
    console.info("Push notification token retrived succesfuly: ", expoToken);

    return expoToken;
  } catch (error) {
    const projectId =
      process.env.EXPO_PUBLIC_PROJECT_ID ||
      Constants?.expoConfig?.extra?.eas?.projectId;
    Alert.alert(
      "Error",
      `Error al obtener el token: ${error.message}\n\n ProjectID:${projectId}`
    );
    throw error;
  }
}
