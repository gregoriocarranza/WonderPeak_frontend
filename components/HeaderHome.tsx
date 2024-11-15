import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Avatar from "@/components/Avatar";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/authContext";
import { router } from "expo-router";
import { UserInfo } from "@/types/interfaces";
import i18n from "@/languages";

export default function HeaderHome() {
  const { token, logout, userMe } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const fetchUserInfo = async () => {
    try {
      if (userInfo) {
        return;
      }

      let savedToken = token;
      if (!savedToken) {
        savedToken = await AsyncStorage.getItem("token");
      }

      if (!savedToken) {
        console.warn("No token found. User is not authenticated.");
        return;
      }

      const response = await fetch(
        "https://wonderpeak.uade.susoft.com.ar/api/users/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener la información del usuario");
      }
      //!! aca hay que trabajar un poco mas esto para que se pueda recuperar del Context si la info ya esta
      const data = await response.json();
      console.log(data, "data user")
      let info: UserInfo = data.data;
      userMe(data.data)

      setUserInfo({
        userUuid: info.userUuid,
        name: info.name,
        lastname: info.lastname,
        nickname: info.nickname,
        email: info.email,
        profileImage: info.profileImage,
        coverImage: info.coverImage,
        description: info.description,
        gender: info.gender,
        gamificationLevel: info.gamificationLevel,
        active: info.active,
      })

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/sign-in");
  };

  const generateHeaderName = () => {
    if (userInfo) {
      const { name, lastname } = userInfo;

      return `${name || ""} ${lastname || ""}`;
    }

    return `${i18n.t("loading")}...`;
  };

  return (
    <View className="flex-row mb-4 justify-between" style={styles.header}>
      <View className="flex-row">
        <Avatar
          image={userInfo?.profileImage}
          gamification={userInfo?.gamificationLevel}
        />
        <View className="ml-6 justify-center">
          <Text className="font-psemibold text-lg text-text">
            {generateHeaderName()}
          </Text>
          <Text className="font-pregular text-text">
            @{userInfo?.nickname || "usuario"}
          </Text>
        </View>
      </View>
      <View className="mr-4">
        <Pressable onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color={Colors.secondary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 90,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
});