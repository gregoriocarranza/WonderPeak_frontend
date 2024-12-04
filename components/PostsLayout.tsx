import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import { Post, PostData } from "@/types/interfaces";
import { getMediaType } from "@/utils/getMediaType";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import i18n from "@/languages";

type RenderImageProps = {
  columnWidth: number;
  item: Post;
};

type Props = {
  data: Post[];
  refreshing: boolean;
  handleRefresh: () => void;
};

const RenderImage = ({ columnWidth, item }: RenderImageProps) => {
  const [isVideo, setIsVideo] = useState(false);
  const video = useRef(null);

  useEffect(() => {
    const mediaType = getMediaType(item.multimediaUrl);
    setIsVideo(mediaType.includes("video"));
  }, [item]);

  return (
    <Link
      href={{
        pathname: "/home/post/[id]",
        params: { id: item.postUuid },
      }}
    >
      <View>
        {isVideo ? (
          <Video
            ref={video}
            source={{ uri: item.multimediaUrl }}
            style={{ height: 130, width: columnWidth, flex: 1 }}
            resizeMode={ResizeMode.COVER}
          />
        ) : (
          <Image
            resizeMode="cover"
            style={{ height: 130, width: columnWidth, flex: 1 }}
            source={{ uri: item.multimediaUrl }}
          />
        )}
      </View>
    </Link>
  );
};

export default function PostsLayout({
  data,
  refreshing,
  handleRefresh,
}: Props) {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = 3;
  const columnWidth = screenWidth / numColumns;
  return (
    <>
      {data && data.length ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <RenderImage columnWidth={columnWidth} item={item} />
            )}
            numColumns={3}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            refreshing={refreshing}
          />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.emptyStateContainer}
        >
          <MaterialIcons
            name="bookmark-outline"
            size={100}
            color={Colors.lavenderGray}
          />
          <Text className="font-pbold" style={styles.text}>
            {i18n.t("emptyStateFavorites")}
          </Text>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    maxWidth: 200,
    textAlign: "center",
    lineHeight: 42,
    width: "80%",
    marginTop: 16,
    color: Colors.lavenderGray,
  },
});
