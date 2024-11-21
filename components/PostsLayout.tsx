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
import { images } from "@/constants";

type RenderImageProps = {
  columnWidth: number;
};

const RenderImage = ({ columnWidth }: RenderImageProps) => {
  return (
    <Pressable>
      <Image
        style={{ height: 130, width: columnWidth }}
        source={images.post3}
      />
    </Pressable>
  );
};

export default function PostsLayout() {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = 3;
  const columnWidth = screenWidth / numColumns;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={Array.from(Array(15).keys())}
        renderItem={(item) => <RenderImage columnWidth={columnWidth} />}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
