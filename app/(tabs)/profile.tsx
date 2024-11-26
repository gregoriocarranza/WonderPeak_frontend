import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import HeaderUser from "@/components/HeaderUser";
import PostsLayout from "@/components/PostsLayout";
import Tabs from "@/components/Tabs";
import { useAuth } from "@/hooks/authContext";

export default function Profile() {
  const { userInfo } = useAuth();
  const userData = userInfo ? JSON.parse(userInfo) : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderUser isOwner showDetails={true} userData={userData} />
      <Tabs />
      {/* <PostsLayout /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
