import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { images } from "@/constants";
import { Colors } from "@/constants/Colors";
import { isValidImage } from "@/utils";

//!!enm gamification deberiamos cargar los otros assets y hacer algo como asset[gamification] asi nos devuelve el asset del nivel corresp
//!TODO:revisar porque no cambia la imagen, si es tema de tamaño o source

type Props = {
  image: string | undefined;
  gamification: any;
  size?: 100 | 80 | 70;
};

export default function Avatar({ image = "", gamification, size = 70 }: Props) {
  const handleIamge = (): void => {};

  return (
    <View style={[styles.avatarContent, { width: size, height: size }]}>
      <LinearGradient
        colors={[Colors.rosePink, Colors.paleGray]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <Pressable
        style={[styles.profileImg, { width: size - 5, height: size - 5 }]}
        onPress={handleIamge}
      >
        {isValidImage(image) ? (
          <Image
            source={{ uri: image }}
            style={[styles.profileImg, { width: size - 5, height: size - 5 }]}
            className="w-full h-100"
          />
        ) : (
          <Image
            source={images.defaultProfile}
            style={[styles.profileImg, { width: size - 5, height: size - 5 }]}
            className="w-full h-100"
          />
        )}
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
    borderRadius: 50,
    position: "relative",
  },
  background: {
    borderRadius: 50,
    ...StyleSheet.absoluteFillObject,
  },
  gamificationContainer: {
    position: "absolute",
    zIndex: 1,
    top: "-20%",
    right: "-10%",
  },
  profileImg: {
    borderRadius: 50,
  },
});
