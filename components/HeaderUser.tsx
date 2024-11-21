import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useAuth } from "@/hooks/authContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type UserData = {
  profileImage: string;
  gamificationLevel: string;
};

export default function HeaderUser() {
  const { userInfo } = useAuth();
  const [userData, setUserData] = useState<UserData>();

  const goToSettings = () => {};

  useEffect(() => {
    if (userInfo) {
      const parsedData = JSON.parse(userInfo);
      const { profileImage, gamificationLevel } = parsedData;
      setUserData({ profileImage, gamificationLevel });
    }
  }, []);
  return (
    <View
      className="border-2 justify-center items-center"
      style={styles.globalContainer}
    >
      <View style={styles.settingsContainer}>
        <Pressable onPress={goToSettings}>
          <Ionicons name="settings" size={24} color={Colors.darkPink} />
        </Pressable>
      </View>

      <View className="items-center">
        <Avatar
          image={userData?.profileImage}
          gamification={userData?.gamificationLevel}
        />
        <Text className="font-psemibold mt-4">Valeria Montes</Text>
        <Text className="font-pregular" style={styles.smallText}>
          @valeria_montes
        </Text>
        <Text
          className="font-pregular text-center mt-3"
          style={[styles.smallText, styles.description]}
        >
          Creando recuerdos y buscando inspiración en cada rincón del mundo ✈️
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    padding: 20,
  },
  settingsContainer: {
    position: "absolute",
    top: 25,
    right: 30,
  },
  smallText: {
    fontSize: 13,
    letterSpacing: 0.5,
  },
  description: {
    maxWidth: 390,
  },
});
