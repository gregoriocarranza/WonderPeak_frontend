import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Text,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import i18n from "@/languages";

import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { AuthProvider } from "@/hooks/authContext";

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
                  label={i18n.t("signIn")}
                  theme="auth"
                />

                <CustomButton
                  onPress={() => router.push("/home")}
                  label={i18n.t("home")}
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
