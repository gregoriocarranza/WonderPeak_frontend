import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import HeaderUser from "@/components/HeaderUser";
import {
  getPostById,
  handlePostFavorite,
  handlePostLike,
} from "@/services/postServices";
import { getUserById } from "@/services/userServices";
import { MediaItem, Post, UserData, UserInfo } from "@/types/interfaces";
import { capitalizeWords, formatDate } from "@/utils";
import GlobalLoading from "@/components/GlobalLoading";
import i18n from "@/languages";
import { Ionicons } from "@expo/vector-icons";
import { getMediaType } from "@/utils/getMediaType";
import PostCarousel from "@/components/Post/PostCarousel";
import CommentsModal from "@/components/CommentsModal";
import { createComment, getPostComments } from "@/services/commentServices";

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const validId = Array.isArray(id) ? id[0] : id;

  const [data, setData] = useState<Post>();
  const [userData, setUserData] = useState<UserInfo | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likeState, setLikeState] = useState<boolean>();
  const [bookmarkState, setbookmarkState] = useState<boolean>();
  const [mediaData, setMediaData] = useState<MediaItem[]>([
    { id: "", type: "", source: "" },
  ]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const goBack = () => {
    router.back();
  };

  const handleLike = async () => {
    if (!data) return;
    try {
      setLikeState(!likeState);
      await handlePostLike(data.postUuid);
    } catch (error) {
      console.error("Error actualizando post like", error);
    }
  };

  const handleBookmarkState = async () => {
    if (!data) return;
    try {
      setbookmarkState(!bookmarkState);
      await handlePostFavorite(data.postUuid);
    } catch (error) {
      console.error("Error actualizando post like", error);
    }
  };

  const getMediaData = (data: Post): MediaItem[] => {
    const basicState = [{ id: "", type: "", source: "" }];

    if (!data) return basicState;
    const mediaType = getMediaType(data.multimediaUrl);
    return [{ id: data.postUuid, type: mediaType, source: data.multimediaUrl }];
  };

  const fetchComments = async () => {
    try {
      setIsLoadingComments(true);
      const response = await getPostComments(validId);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleAddComment = async (text: string) => {
    try {
      await createComment(validId, text);
      await fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };

  const handleShowComments = async () => {
    await fetchComments();
    setIsCommentsVisible(true);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        if (!id) {
          console.warn("No ID found");
          return;
        }

        const data = await getPostById(validId);
        const userData = await getUserById(data.data.userUuid);

        setData(data.data);
        setUserData(userData.data);

        if (data) {
          const mediaData = getMediaData(data.data);
          setMediaData(mediaData);
          setbookmarkState(data.data.favorite);
          setLikeState(data.data.liked);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [validId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {isLoading ? (
        <GlobalLoading />
      ) : (
        <>
          <HeaderUser
            isOwner={false}
            showGoBack={true}
            showDetails={false}
            goBackAction={goBack}
            userData={userData}
            avatarSize={80}
          />

          {data && (
            <View>
              <View style={styles.header}>
                <Text className="font-pregular" style={styles.headerText}>
                  📍 {}
                  {capitalizeWords(data.location?.placeHolder) ||
                    i18n.t("locationNotAvailable")}
                </Text>
              </View>
              <View>
                <PostCarousel mediaData={mediaData} />
              </View>
              <View style={styles.footer}>
                <Text className="font-pregular">
                  {formatDate(data.createdAt)}
                </Text>
                {data.title && (
                  <Text className="font-psemibold">{data.title}</Text>
                )}
                {data.text && (
                  <Text className="font-pregular">{data.text}</Text>
                )}
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
                        {data.likesCount}
                      </Text>
                    </View>
                    <Pressable
                      className="flex-row gap-1"
                      onPress={handleShowComments}
                    >
                      <Ionicons
                        name="chatbubble-outline"
                        size={24}
                        color={Colors.secondary}
                      />
                      <Text className="items-center font-pregular text-lg">
                        {comments.length}{" "}
                        {i18n.t("comment", { count: comments.length })}
                      </Text>
                    </Pressable>
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
          )}
          <CommentsModal
            isVisible={isCommentsVisible}
            onClose={() => setIsCommentsVisible(false)}
            comments={comments}
            onSubmit={handleAddComment}
            isLoading={isLoadingComments}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 46,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  headerText: {
    letterSpacing: 1.25,
  },
  text: {
    color: Colors.darkPink,
  },
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
