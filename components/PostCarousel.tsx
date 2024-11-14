import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Video } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  TapGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("window");

type MediaItem = {
  id: string;
  type: "image" | "video";
  source: any;
};

type Props = {
  mediaData: MediaItem[];
};

export default function PostCarousel({ mediaData }: Props) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isValidImage = (source: string): boolean => {
    const regex =
      /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})(\/[\w.-]+)*\/?([\w-]+\.(jpg|jpeg|png|gif|bmp|webp|svg))$/i;
    return regex.test(source);
  };

  const renderItem = ({ item, index }: { item: MediaItem; index: number }) => (
    <GestureHandlerRootView>
      <TapGestureHandler
        numberOfTaps={2}
        onActivated={() => handleDoubleTap(index)}
      >
        <View style={styles.carouselItem}>
          {item.type === "image" ? (
            <>
              {isValidImage(item.source) && (
                <Image
                  source={{ uri: item.source }}
                  resizeMode="cover"
                  style={styles.image}
                  className="w-full"
                />
              )}
            </>
          ) : (
            <Video
              source={item.source}
              style={styles.image}
              useNativeControls
              isLooping
            />
          )}
        </View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );

  const handleDoubleTap = (index: number) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setSelectedIndex(null);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  return (
    <>
      <FlatList
        data={mediaData}
        pagingEnabled
        showsHorizontalScrollIndicator
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        renderItem={({ item, index }) => renderItem({ item, index })}
      />

      <Modal visible={isFullscreen} transparent={true}>
        <View style={styles.fullscreenContainer}>
          <TouchableOpacity
            onPress={handleCloseFullscreen}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color={Colors.white} />
          </TouchableOpacity>
          <FlatList
            style={{ marginTop: "60%" }}
            data={mediaData}
            pagingEnabled
            initialScrollIndex={selectedIndex}
            showsHorizontalScrollIndicator
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
            getItemLayout={getItemLayout}
            renderItem={renderItem}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
  },
  carouselItem: {
    height: 300,
    width: screenWidth,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
});
