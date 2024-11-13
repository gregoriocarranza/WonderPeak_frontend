import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { images } from "@/constants";
import { Colors } from "@/constants/Colors";

//!!enm gamification deberiamos cargar los otros assets y hacer algo como asset[gamification] asi nos devuelve el asset del nivel corresp
//!TODO:revisar porque no cambia la imagen, si es tema de tamaño o source
export default function Avatar(image: any, gamification: any) {
  return (
    <View style={styles.avatarContent}>
      <LinearGradient
        colors={[Colors.rosePink, Colors.paleGray]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Image source={image} />
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
