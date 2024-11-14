import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostCarousel from "./PostCarousel";
import i18n from "@/languages";
import { Post } from "@/types/interfaces";

type MediaItem = {
  id: string;
  type: "image" | "video";
  source: any;
};

export default function PostItem({
  postUuid,
  userUuid,
  title,
  text,
  user,
  location,
  multimediaUrl,
  commentsCount,
  likesCount,
  createdAt,
  updatedAt,
}: Post) {
  const formatDate = (isoString: string): string => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const mediaData: MediaItem[] = [
    { id: postUuid, type: "image", source: multimediaUrl },
  ];
  //TODO: ver manejo de imagenes en carrousel!
  return (
    <View style={styles.postContainer}>
      <View style={styles.headerPost} className="flex-row">
        <Image source={images.defaultProfile} style={styles.profileImage} />
        <View className="ml-4">
          <Text className="font-psemibold text-lg">{user?.name} {user?.lastname} </Text>
          <Text style={styles.location} className="font-pregular">
          📍 {location?.mapsUrl || "Ubicación no disponible"}

          </Text>
        </View>
      </View>
      <View style={styles.main}>
        <PostCarousel mediaData={mediaData} />
      </View>
      <View style={styles.footer}>
        <Text className="font-pregular">{formatDate(createdAt)}</Text>
        <Text className="font-psemibold">
          {title}
        </Text>
        <Text className="font-pregular">
          {text}
        </Text>
        <View className="mt-3 flex-row justify-between">
          <View className="flex-row gap-4">
            <View className="flex-row gap-1">
              <Ionicons
                name="heart-outline"
                size={24}
                color={Colors.secondary}
              />
              <Text className="items-center font-pregular text-lg">{likesCount}</Text>
            </View>
            <View className="flex-row gap-1">
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={Colors.secondary}
              />
              <Text className="items-center font-pregular text-lg">
                {commentsCount} {i18n.t("comment", { count: 4 })}
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
    backgroundColor: Colors.white,
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
