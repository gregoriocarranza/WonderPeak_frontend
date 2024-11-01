import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { images } from "@/constants";
import { Colors } from "@/constants/Colors";

export default function Avatar() {
  return (
    <View style={styles.avatarContent}>
      <LinearGradient
        colors={[Colors.rosePink, Colors.paleGray]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Image source={images.profile} />
      <View style={styles.gamificationContainer}>
        <Image source={images.gamification} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContent: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    borderRadius: 50,
    height: 72,
  },
  container: {
    flex: 1,
  },
  background: {
    borderRadius: 50,
    ...StyleSheet.absoluteFillObject,
  },
  gamificationContainer: {
    position: "absolute",
    left: 30,
    bottom: 30,
  },
});
