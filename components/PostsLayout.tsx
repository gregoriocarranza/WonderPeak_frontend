import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { Post, PostData } from "@/types/interfaces";

type RenderImageProps = {
  columnWidth: number;
  item: Post;
};

const RenderImage = ({ columnWidth, item }: RenderImageProps) => {
  const goToPostDetail = () => {
    router.push("/postDetail");
  };

  return (
    <Pressable onPress={goToPostDetail}>
      <Image
        style={{ height: 130, width: columnWidth }}
        source={{ uri: item.multimediaUrl }}
      />
    </Pressable>
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
