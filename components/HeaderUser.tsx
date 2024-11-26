import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useAuth } from "@/hooks/authContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

type UserData = {
  profileImage: string;
  gamificationLevel: string;
};

type Props = {
  isOwner?: boolean;
  showGoBack?: boolean;
  showDetails?: boolean;
  goBackAction?: () => void;
  userData?: {
    name: string;
    nickname: string;
    description: string;
    profileImage: string;
    coverImage: string;
    gamificationLevel: number;
    email: string;
    gender: string;
    lastname: string | null;
    userUuid: string;
    active: number;
  };
};

export default function HeaderUser({
  isOwner = false,
  showGoBack,
  goBackAction,
  showDetails,
  userData,
}: Props) {
  const goToSettings = () => {
    router.push("/settings");
  };

  return (
    <View
      className="justify-center items-center"
      style={styles.globalContainer}
    >
      {showGoBack && (
        <View style={styles.goBackContainer}>
          <Pressable onPress={goBackAction}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors.secondary}
            />
          </Pressable>
        </View>
      )}

      {isOwner && (
        <View style={styles.settingsContainer}>
          <Pressable onPress={goToSettings}>
            <Ionicons name="settings" size={24} color={Colors.darkPink} />
          </Pressable>
        </View>
      )}

      <View className="items-center">
        <Avatar
          image={userData?.profileImage}
          gamification={userData?.gamificationLevel}
        />
        <Text className="font-psemibold mt-4">
          {userData?.name} {userData?.lastname || ""}
        </Text>
        <Text className="font-pregular" style={styles.smallText}>
          @{userData?.nickname}
        </Text>
        {showDetails && userData?.description && (
          <Text
            className="font-pregular text-center mt-3"
            style={[styles.smallText, styles.description]}
          >
            {userData?.description}
          </Text>
        )}
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
  goBackContainer: {
    position: "absolute",
    top: 25,
    left: 20,
  },
  smallText: {
    fontSize: 13,
    letterSpacing: 0.5,
  },
  description: {
    maxWidth: 390,
  },
});
