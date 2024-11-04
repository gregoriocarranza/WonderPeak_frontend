import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostCarousel from "./PostCarousel";

type Props = {
  userName: string;
};

type MediaItem = {
  id: string;
  type: "image" | "video";
  source: any;
};

export default function Post({ userName }: Props) {
  const mediaData: MediaItem[] = [
    { id: "1", type: "image", source: images.post },
    { id: "2", type: "image", source: images.post2 },
    { id: "3", type: "image", source: images.post3 },
  ];

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
        <PostCarousel mediaData={mediaData} />
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
        <View className="mt-3 flex-row justify-between">
          <View className="flex-row gap-4">
            <View className="flex-row gap-1">
              <Ionicons
                name="heart-outline"
                size={24}
                color={Colors.secondary}
              />
              <Text className="items-center font-pregular text-lg">23</Text>
            </View>
            <View className="flex-row gap-1">
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={Colors.secondary}
              />
              <Text className="items-center font-pregular text-lg">
                4 Comentarios
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Ionicons
                name="bookmark-outline"
                size={24}
                color={Colors.secondary}
              />
            </View>
          </View>
        </View>
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
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
