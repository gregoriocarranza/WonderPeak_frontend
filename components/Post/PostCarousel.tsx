import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { ResizeMode, Video } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  TapGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { isValidImage } from "@/utils";
import { StatusBar } from "expo-status-bar";
import { MediaItem } from "@/types/interfaces";

const { width: screenWidth } = Dimensions.get("window");

type Props = {
  mediaData: MediaItem[];
};

export default function PostCarousel({ mediaData }: Props) {
  const video = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const renderItem = ({ item, index }: { item: MediaItem; index: number }) => (
    <GestureHandlerRootView>
      <TapGestureHandler
        numberOfTaps={2}
        onActivated={() => handleDoubleTap(index)}
      >
        <View style={styles.carouselItem}>
          {item.type.includes("image") ? (
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
              ref={video}
              source={{ uri: item.source }}
              style={styles.image}
              useNativeControls
              isLooping
              resizeMode={ResizeMode.CONTAIN}
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

        <StatusBar backgroundColor="black" />
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
