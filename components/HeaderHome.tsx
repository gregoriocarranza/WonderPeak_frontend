import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "@/components/Avatar";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function HeaderHome() {
  return (
    <View className="flex-row mb-4 justify-between" style={styles.header}>
      <View className="flex-row">
        <Avatar />
        <View className="ml-6 justify-center">
          <Text className="font-psemibold text-lg text-text">
            Valeria Montes
          </Text>
          <Text className="font-pregular text-text">@valeria_montes</Text>
        </View>
      </View>
      <View className="mr-4">
        <Pressable>
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
