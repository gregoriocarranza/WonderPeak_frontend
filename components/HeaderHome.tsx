import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "@/components/Avatar";

export default function HeaderHome() {
  return (
    <View className="flex-row mb-4" style={styles.header}>
      <Avatar />
      <View className="ml-6 justify-center">
        <Text className="font-psemibold text-lg text-text">Valeria Montes</Text>
        <Text className="font-pregular text-text">@valeria_montes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 90,
    paddingHorizontal: 12,
    alignItems: "center",
  },
});
