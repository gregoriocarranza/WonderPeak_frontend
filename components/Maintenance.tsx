import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Text,
  Image,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import i18n from "@/languages";

import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

export default function Maintenance() {
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
              <Image source={images.maintenance} style={styles.image} />

              <Text className="font-pbold" style={styles.text}>
                {i18n.t("weAreInMaintenance")}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>

      <StatusBar style="dark" />
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
  image: {
    width: 300,
    height: 300,
    maxWidth: "100%",
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    width: "80%",
    color: Colors.light.text,
  },
});
