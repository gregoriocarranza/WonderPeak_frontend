import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import HeaderUser from "@/components/HeaderUser";
import { useAuth } from "@/hooks/authContext";
import UserTabsData from "@/components/UserTabsData";

export default function Profile() {
  const { userInfo } = useAuth();
  const userData = userInfo ? JSON.parse(userInfo) : null;
  const { userUuid: id } = userData || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderUser isOwner showDetails={true} userData={userData} />
      <UserTabsData id={id} type="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
