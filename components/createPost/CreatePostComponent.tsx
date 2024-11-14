import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  ActivityIndicator,
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true)
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
    setLoading(false)
    };

    loadGalleryImages();
  }, []);

  const openFullGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
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

  const nextStep = () => {
    goToSettings(selectedImages);
  };

  return (
    <>
      {loading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={"large"} color={Colors.white} />
        </View>
      )}

      <View className="justify-between items-center" style={[styles.flexRow, styles.header]}>
        <View style={[styles.flexRow, styles.centerItems]}>
          <Pressable onPress={cancelPost} style={styles.p2}>
            <MaterialIcons name="close" size={24} color={Colors.secondary} />
          </Pressable>
          <Text className="font-psemibold" style={[styles.text, styles.fontPsemibold]}>
            {i18n.t("newPost")}
          </Text>
        </View>
        <View style={[styles.centerItems, styles.p3]}>
          <Pressable onPress={nextStep}>
            <Text className="font-psemibold" style={[styles.link, styles.fontPsemibold]}>
              {i18n.t("next")}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.customField}>
        {selectedImages && selectedImages.length > 0 && (
          <FlatList
            data={selectedImages}
            keyExtractor={(item, index) => `${item?.uri}-${index}`}
            horizontal
            pagingEnabled
            initialScrollIndex={0}
            renderItem={({ item }) => (
              <View style={styles.mediaContainer}>
                {(item?.type === "image" || item?.type === "photo") && (
                  <Image
                    source={{ uri: item?.uri }}
                    resizeMode="cover"
                    style={styles.image}
                  />
                )}
                {item?.type === "video" && (
                  <Video
                    source={{ uri: item?.uri }}
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
        <View style={styles.openGalleryBtn}>
          <Pressable onPress={openFullGallery} style={styles.flexRow}>
            <Text style={[styles.text, styles.fontPsemibold]}>
              {i18n.t("myPhotos")}
            </Text>
            <Ionicons name="chevron-down" size={24} color={Colors.light.text} />
          </Pressable>
        </View>

        <FlatList
          data={galleryImages}
          renderItem={renderFooterImage}
          keyExtractor={(item, index) => item?.uri + index}
          horizontal
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: { height: 72 },
  customField: {
    backgroundColor: Colors.paleGray,
    flex: 1,
    justifyContent: "center",
  },
  footer: { padding: 10 },
  footerImage: {
    width: 150,
    height: 100,
    marginHorizontal: 4,
  },
  link: { color: Colors.light.buttonBackground },
  image: { width: screenWidth, height: "100%" },
  openGalleryBtn: { height: 30 },
  text: { color: Colors.light.text, fontSize: 16 },
  mediaContainer: { width: screenWidth },
  flexRow: { flexDirection: "row" },
  centerItems: { alignItems: "center", justifyContent: "center" },
  p2: { padding: 8 },
  p3: { padding: 12 },
  fontPsemibold: { fontWeight: "600" },
  activityIndicatorContainer: {
    borderWidth: 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000033",
    zIndex: 1,
  },
});
