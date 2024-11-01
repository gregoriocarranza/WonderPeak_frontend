import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  ImageBackground,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";

export default function Home() {
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
              <CustomButton
                onPress={() => router.push("/sign-in")}
                label="Iniciar Sesión"
                theme="auth"
              />

              <CustomButton
                onPress={() => router.push("/home")}
                label="Home"
                theme="auth"
              />
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
