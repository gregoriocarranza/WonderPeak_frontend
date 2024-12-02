import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/Colors";
import { FormState } from "@/types/interfaces";
import EditPicturesButton from "./EditPicturesButton";
import SelectImageModal from "./SelectImageModal";

type Props = {
  goBackAction?: () => void;
  temporalData?: FormState;
  // handlePictures: (type: "profileImage" | "coverImage") => void;
};

export default function HeaderSetttings({ goBackAction, temporalData }: Props) {
  const [isOpenSelectModal, setIsOpenSelectModal] = useState(false);
  const [currentType, setCurrentType] = useState<"profile" | "cover">();
  const [selectedImages, setSelectedImages] = useState({
    profile: "",
    cover: "",
  });

  const openSelectImageModal = (type: "profile" | "cover") => {
    setIsOpenSelectModal(true);
    setCurrentType(type);
  };

  const handlePictureFromCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && currentType) {
        setSelectedImages((prevData) => ({
          ...prevData,
          [currentType]: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error("Error uploading an image", error);
      Alert.alert("Error al cargar imagen");
    } finally {
      setIsOpenSelectModal(false);
    }
  };

  const handlePictureFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && currentType) {
        setSelectedImages((prevData) => ({
          ...prevData,
          [currentType]: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error("Error uploading an image", error);
      Alert.alert("Error al cargar imagen");
    } finally {
      setIsOpenSelectModal(false);
    }
  };

  return (
    <>
      <ImageBackground
        source={{ uri: selectedImages.cover || temporalData?.coverImage }}
        resizeMode="cover"
        className="justify-center items-center"
        style={[styles.globalContainer]}
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={styles.goBackContainer}>
          <Pressable onPress={goBackAction}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors.secondary}
            />
          </Pressable>
        </View>

        <View className="items-center">
          <View style={{ position: "relative" }}>
            <View style={styles.avatarContent}>
              <LinearGradient
                colors={[Colors.rosePink, Colors.paleGray]}
                style={styles.background}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />

              <View style={styles.profileImg}>
                <Image
                  source={{
                    uri: selectedImages.profile || temporalData?.profileImage,
                  }}
                  style={styles.profileImg}
                  className="w-full h-100"
                />
              </View>
            </View>

            <View style={styles.editProfilePicture}>
              <EditPicturesButton
                onPressAction={() => openSelectImageModal("profile")}
              />
            </View>
          </View>
          <Text className="font-psemibold mt-4">
            {temporalData?.name} {temporalData?.lastname || ""}
          </Text>
          <Text className="font-pregular" style={styles.smallText}>
            @{temporalData?.nickname}
          </Text>
        </View>
        <View style={styles.editCoverPicture}>
          <EditPicturesButton
            onPressAction={() => openSelectImageModal("cover")}
          />
        </View>
      </ImageBackground>

      {isOpenSelectModal && (
        <SelectImageModal
          cancelAction={() => setIsOpenSelectModal(false)}
          onCameraSelected={handlePictureFromCamera}
          onGallerySelected={handlePictureFromGallery}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    padding: 20,
    height: 220,
  },
  goBackContainer: {
    position: "absolute",
    top: 25,
    left: 20,
  },
  smallText: {
    fontSize: 13,
    letterSpacing: 0.5,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
  },
  editProfilePicture: {
    position: "absolute",
    top: "50%",
    marginTop: -20,
    marginLeft: 30,
    opacity: 0.7,
  },
  editCoverPicture: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 20,
    bottom: 20,
  },
  avatarContent: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "relative",
    width: 100,
    height: 100,
  },
  background: {
    borderRadius: 50,
    ...StyleSheet.absoluteFillObject,
  },
  profileImg: {
    borderRadius: 50,
    width: 95,
    height: 95,
  },
});
