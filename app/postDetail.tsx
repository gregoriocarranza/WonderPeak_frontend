import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import HeaderUser from "@/components/HeaderUser";
import { router } from "expo-router";
import { images } from "@/constants";

export default function PostDetail() {
  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <HeaderUser
        isOwner={false}
        showGoBack={true}
        showDetails={false}
        goBackAction={goBack}
      />
      <View className="border-2">
        <View style={styles.header}>
          <Text className="font-pregular" style={styles.headerText}>
            📍 Argentina
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 46,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  headerText: {
    letterSpacing: 1.25,
  },
});
