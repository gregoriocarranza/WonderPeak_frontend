import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import HeaderUser from "@/components/HeaderUser";
import PostsLayout from "@/components/PostsLayout";
import { useAuth } from "@/hooks/authContext";
import UserTabsData from "@/components/UserTabsData";

export default function Favorites() {
  const { userInfo } = useAuth();
  const userData = userInfo ? JSON.parse(userInfo) : null;
  const { userUuid: id } = userData || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderUser isOwner showDetails={true} userData={userData} />
      <UserTabsData id={id} type="favorites" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
