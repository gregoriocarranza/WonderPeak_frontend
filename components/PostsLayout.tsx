import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import { Post, PostData } from "@/types/interfaces";
import { getMediaType } from "@/utils/getMediaType";

type RenderImageProps = {
  columnWidth: number;
  item: Post;
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

export default function PostsLayout({ data }: PostData) {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = 3;
  const columnWidth = screenWidth / numColumns;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <RenderImage columnWidth={columnWidth} item={item} />
        )}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
