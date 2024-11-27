import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostCarousel from "./PostCarousel";
import { Advertising } from "@/types/interfaces";
type MediaItem = {
  id: string;
  type: string | "image" | "video";
  source: any;
};

export default function AdvertisingPost({
  commerceImage,
  commerceName,
  commerceUrl,
  title,
  text,
  multimediaUrl,
  id,
}: Advertising) {
  const mediaData: MediaItem[] = [{ id, type: "image", source: multimediaUrl }];

  const shareData = () => {};

  const handleOpenURL = () => {
    if (commerceUrl) {
      Linking.openURL(commerceUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.headerPost} className="flex-row">
        <Image source={{ uri: commerceImage }} style={styles.profileImage} />
        <View className="ml-4">
          {commerceName && (
            <Text className="font-psemibold text-lg">{commerceName} </Text>
          )}

          <Pressable onPress={handleOpenURL}>
            <Text style={styles.link} className="font-pregular">
              {commerceUrl}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.main}>
        <PostCarousel mediaData={mediaData} />
      </View>
      <View style={styles.footer}>
        {/* TODO: las publicidaddes tienen fecha?  */}
        {/* <Text className="font-pregular">{formatDate(createdAt)}</Text> */}
        {title && <Text className="font-psemibold">{title}</Text>}
        {text && <Text className="font-pregular">{text}</Text>}
        <View className="mt-3">
          {/* TODO: las publicidaddes tienen likes y comentarios?  */}
          <View className="self-end">
            <Pressable onPress={shareData}>
              <Ionicons
                name={"share-outline"}
                size={24}
                color={Colors.secondary}
              />
            </Pressable>
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
  link: {
    letterSpacing: 1.5,
    color: Colors.link,
  },
  main: {
    height: 300,
  },
  footer: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
