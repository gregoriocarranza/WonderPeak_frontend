import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "@/constants";
import { Colors } from "@/constants/Colors";

type Props = {
  userName: string;
};

export default function Post({ userName }: Props) {
  return (
    <View style={styles.postContainer}>
      <View style={styles.headerPost} className="flex-row">
        <Image source={images.userProfile} />
        <View className="ml-4">
          <Text className="font-psemibold text-lg">Camila Estrada</Text>
          <Text style={styles.location} className="font-pregular">
            📍 Patagonia Argentina
          </Text>
        </View>
      </View>
      <View style={styles.main}>
        <Image
          source={images.post}
          resizeMode="cover"
          style={styles.image}
          className="w-full"
        />
      </View>
      <View style={styles.footer}>
        <Text className="font-pregular">24/09/2024</Text>
        <Text className="font-psemibold">
          Enfrentando la naturaleza, forjando el camino 🌲🏔️
        </Text>
        <Text className="font-pregular">
          Perderse en la inmensidad de la naturaleza es la mejor manera de
          encontrarse a uno mismo
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.lightPurple,
  },
  headerPost: {
    height: 72,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  location: {
    letterSpacing: 1.5,
  },
  main: {
    height: 300,
  },
  image: {
    height: "100%",
  },
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
