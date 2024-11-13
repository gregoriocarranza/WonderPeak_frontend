import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Text,
} from "react-native";
import React from "react";
import { Redirect } from "expo-router";

import { images } from "@/constants";
import { useAuth } from "@/hooks/authContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <View className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.modal}>
          <ImageBackground
            style={styles.imageBackground}
            resizeMode="cover"
            source={images.background}
            className="h-full w-full"
          >
            <View style={styles.modalContent}>
              {!isAuthenticated ? (
                <Redirect href="/sign-in" />
              ) : (
                <Redirect href="/home" />
              )}
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
});
