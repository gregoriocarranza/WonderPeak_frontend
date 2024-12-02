import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { FormState } from "@/types/interfaces";
import EditPicturesButton from "./EditPicturesButton";
import { LinearGradient } from "expo-linear-gradient";
import SelectImageModal from "./SelectImageModal";

type Props = {
  goBackAction?: () => void;
  temporalData?: FormState;
  handlePictures: (type: "profileImage" | "coverImage") => void;
};

export default function HeaderSetttings({
  goBackAction,
  temporalData,
  handlePictures,
}: Props) {
  const [isOpenSelectModal, setIsOpenSelectModal] = useState(false);

  const openSelectImageModal = () => {
    setIsOpenSelectModal(true);
  };

  return (
    <>
      <ImageBackground
        source={{ uri: temporalData?.coverImage }}
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
                  source={{ uri: temporalData?.profileImage }}
                  style={styles.profileImg}
                  className="w-full h-100"
                />
              </View>
            </View>

            <View style={styles.editProfilePicture}>
              <EditPicturesButton onPressAction={openSelectImageModal} />
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
          <EditPicturesButton onPressAction={openSelectImageModal} />
        </View>
      </ImageBackground>

      {isOpenSelectModal && (
        <SelectImageModal cancelAction={() => setIsOpenSelectModal(false)} />
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
