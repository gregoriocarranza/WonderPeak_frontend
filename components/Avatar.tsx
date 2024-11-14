import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { images } from "@/constants";
import { Colors } from "@/constants/Colors";

//!!enm gamification deberiamos cargar los otros assets y hacer algo como asset[gamification] asi nos devuelve el asset del nivel corresp
//!TODO:revisar porque no cambia la imagen, si es tema de tamaño o source

type Props = {
  image: string | undefined;
  gamification: any;
};

export default function Avatar({ image, gamification }: Props) {
  const handleIamge = (): void => {};
  return (
    <View style={styles.avatarContent}>
      <LinearGradient
        colors={[Colors.rosePink, Colors.paleGray]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Pressable style={styles.profileImg} onPress={handleIamge}>
        <Image
          source={{ uri: image }}
          style={styles.profileImg}
          className="w-full h-100"
        />
      </Pressable>
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
  profileImg: {
    borderRadius: 50,
    flex: 1,
    position: "absolute",
    width: 70,
    height: 70,
  },
});
