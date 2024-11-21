import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import HeaderUser from "@/components/HeaderUser";
import PostsLayout from "@/components/PostsLayout";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderUser isOwer />
      <PostsLayout />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
