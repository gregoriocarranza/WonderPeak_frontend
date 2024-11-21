import { StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderUser from "@/components/HeaderUser";
import PostsLayout from "@/components/PostsLayout";
import { router } from "expo-router";

export default function userProfile() {
  const goToSearch = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderUser showGoBack={true} goBackAction={goToSearch} />
      <PostsLayout />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
