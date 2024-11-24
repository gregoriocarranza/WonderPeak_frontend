import { Pressable, StyleSheet, View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderUser from "@/components/HeaderUser";
import PostsLayout from "@/components/PostsLayout";
import { router } from "expo-router";
import i18n from "@/languages";
import { MaterialIcons } from "@expo/vector-icons";

export default function userProfile() {
  const goToSearch = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderUser
        showGoBack={true}
        goBackAction={goToSearch}
        showDetails={true}
      />
      <View style={styles.actionsSection}>
        <Pressable style={styles.followButton}>
          <Text className="font-pregular" style={styles.followText}>
            {i18n.t("follow")}
          </Text>
        </Pressable>
        <Pressable style={styles.followButton}>
          <MaterialIcons name="stars" size={24} color={Colors.darkPurple} />
        </Pressable>
      </View>
      <PostsLayout />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionsSection: {
    flexDirection: "row",
    paddingVertical: 4,
    justifyContent: "center",
    gap: 16,
  },
  followButton: {
    borderWidth: 1,
    borderColor: Colors.darkPurple,
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 24,
    width: "auto",
  },
  followText: {
    color: Colors.darkPurple,
  },
});
