import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Video } from "expo-av";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import i18n from "@/languages";

const { width: screenWidth } = Dimensions.get("window");

type SelectedImage = {
  uri: string;
  type: string | undefined;
};

type Props = {
  goToSettings: (data: SelectedImage[]) => void;
};

export default function CreatePostComponent({ goToSettings }: Props) {
  const [galleryImages, setGalleryImages] = useState<SelectedImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  useEffect(() => {
    const loadGalleryImages = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert(i18n.t("permissionIsRequired"));
        return;
      }

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
        sortBy: [MediaLibrary.SortBy.creationTime],
      });

      const uris: SelectedImage[] = media.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.mediaType,
      }));

      setGalleryImages(uris);
      setSelectedImages([uris[0]]);
    };

    loadGalleryImages();
  }, []);

  const openFullGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 10,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const selectedUris: SelectedImage[] = result.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.type,
      }));

      console.log(selectedUris);

      setSelectedImages(selectedUris);
    }
  };
  const renderFooterImage = ({ item }: { item: SelectedImage }) => (
    <Pressable onPress={() => setSelectedImages([item])}>
      <Image source={{ uri: item.uri }} style={styles.footerImage} />
    </Pressable>
  );
  const cancelPost = (): void => {
    router.replace("/home");
  };
  const nextStep = () => {
    goToSettings(selectedImages);
  };

  return (
    <>
      <View className="flex-row justify-between" style={styles.header}>
        <View className="flex-row items-center justify-center">
          <Pressable onPress={cancelPost} className="p-2">
            <MaterialIcons name="close" size={24} color={Colors.secondary} />
          </Pressable>
          <Text className="font-psemibold" style={styles.text}>
            {i18n.t("newPost")}
          </Text>
        </View>

        <View className="items-center justify-center p-3">
          <Pressable onPress={nextStep}>
            <Text className="font-psemibold" style={styles.link}>
              {i18n.t("next")}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.customField}>
        {selectedImages && selectedImages.length > 0 && (
          <FlatList
            data={selectedImages}
            keyExtractor={(item) => item.uri}
            horizontal
            pagingEnabled
            initialScrollIndex={0}
            renderItem={({ item }) => (
              <View style={styles.mediaContainer}>
                {(item.type === "image" || item.type === "photo") && (
                  <Image
                    source={{ uri: item.uri }}
                    resizeMode="cover"
                    style={styles.image}
                  />
                )}
                {item.type === "video" && (
                  <Video
                    source={{ uri: item.uri }}
                    style={styles.image}
                    useNativeControls
                    isLooping
                  />
                )}
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.footer}>
        <View className="mb-3" style={styles.openGalleryBtn}>
          <Pressable
            onPress={openFullGallery}
            className="flex-row items-center"
          >
            <Text className="font-psemibold mr-3" style={styles.text}>
              {i18n.t("myPhotos")}
            </Text>
            <Ionicons name="chevron-down" size={24} color={Colors.light.text} />
          </Pressable>
        </View>

        <FlatList
          data={galleryImages}
          renderItem={renderFooterImage}
          keyExtractor={(item, index) => item.uri + index}
          horizontal
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 72,
  },
  customField: {
    backgroundColor: Colors.paleGray,
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    padding: 10,
  },
  footerImage: {
    width: 150,
    height: 100,
    marginHorizontal: 4,
  },
  link: {
    color: Colors.light.buttonBackground,
  },
  image: {
    width: screenWidth,
    height: "100%",
  },
  openGalleryBtn: {
    height: 30,
  },
  text: {
    color: Colors.light.text,
    fontSize: 16,
  },
  mediaContainer: {
    width: screenWidth,
  },
});