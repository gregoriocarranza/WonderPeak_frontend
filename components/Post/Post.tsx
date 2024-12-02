import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostCarousel from "./PostCarousel";
import i18n from "@/languages";
import { MediaItem, Post } from "@/types/interfaces";
import { capitalizeWords, formatDate } from "@/utils";
import { Link } from "expo-router";
import { getMediaType } from "@/utils/getMediaType";
import { handlePostFavorite, handlePostLike } from "@/services/postServices";

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
  favorite,
  liked,
}: Post) {
  //TODO: cada posteo del feed tiene que tener un atributo que sea liked /isLiked que sea la busqueda del userId en la base del Feed
  const [likeState, setLikeState] = useState(liked);
  const [bookmarkState, setbookmarkState] = useState(favorite);
  const mediaType = getMediaType(multimediaUrl).split("/")[0];
  const multimediaUrlFix = getMediaType(multimediaUrl).split("/")[0];
  const mediaData: MediaItem[] = [
    { id: postUuid, type: mediaType, source: multimediaUrl },
  ];

  const handleLike = async () => {
    try {
      setLikeState(!likeState);
      await handlePostLike(postUuid);
    } catch (error) {
      console.error("Error actualizando post like", error);
    }
  };

  const handleBookmarkState = async () => {
    try {
      setbookmarkState(!bookmarkState);
      await handlePostFavorite(postUuid);
    } catch (error) {
      console.error("Error actualizando post like", error);
    }
  };

  return (
    <View style={styles.postContainer}>
      <Link
        href={{
          pathname: "/search/userProfile/[id]",
          params: { id: userUuid },
        }}
      >
        <View style={styles.headerPost} className="flex-row">
          <Image
            className="border-2"
            source={{ uri: user.profileUserImage }}
            style={styles.profileImage}
          />
          <View className="ml-4">
            <Text className="font-psemibold text-lg">
              {user?.name} {user?.lastname}{" "}
            </Text>
            <Text style={styles.location} className="font-pregular">
              📍
              {capitalizeWords(location?.placeHolder) ||
                i18n.t("locationNotAvailable")}
            </Text>
          </View>
        </View>
      </Link>

      <View style={styles.main}>
        <PostCarousel mediaData={mediaData} />
      </View>
      <View style={styles.footer}>
        <Text className="font-pregular">{formatDate(createdAt)}</Text>
        {title && <Text className="font-psemibold">{title}</Text>}
        {text && <Text className="font-pregular">{text}</Text>}
        <View className="mt-3 flex-row justify-between">
          <View className="flex-row gap-4">
            <View className="flex-row gap-1">
              <Pressable onPress={handleLike}>
                <Ionicons
                  name={likeState ? "heart" : "heart-outline"}
                  size={24}
                  color={likeState ? Colors.rosePink : Colors.secondary}
                />
              </Pressable>
              <Text className="items-center font-pregular text-lg">
                {likesCount}
              </Text>
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
              <Pressable onPress={handleBookmarkState}>
                <Ionicons
                  name={bookmarkState ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={bookmarkState ? Colors.gray : Colors.secondary}
                />
              </Pressable>
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
