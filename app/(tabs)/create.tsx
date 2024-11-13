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
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { Link, router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import i18n from "@/languages";

const { width: screenWidth } = Dimensions.get("window");

type SelectedImage = {
  uri: string;
  type: string | undefined;
};

export default function Create() {
  const [galleryImages, setGalleryImages] = useState<SelectedImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<
    SelectedImage[] | undefined
  >();

  useEffect(() => {
    const loadGalleryImages = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert(i18n.t("permissionIsRequired"));
        return;
      }

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
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

  return (
    <SafeAreaView className="flex-1 justify-between p-0">
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
          <Link
            className="font-psemibold text-black underline"
            style={styles.link}
            href="/"
          >
            {" "}
            {i18n.t("next")}
          </Link>
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
                <Image
                  source={{ uri: item.uri }}
                  resizeMode="cover"
                  style={styles.image}
                />
                <Text>{item.uri}</Text>
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
    </SafeAreaView>
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
