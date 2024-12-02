import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import i18n from "@/languages";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  cancelAction: () => void;
  onCameraSelected: () => void;
  onGallerySelected: () => void;
};

export default function SelectImageModal({
  cancelAction,
  onCameraSelected,
  onGallerySelected,
}: Props) {
  return (
    <View style={styles.modalBackground}>
      <View style={styles.modal}>
        <Pressable onPress={cancelAction} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={Colors.secondary} />
        </Pressable>
        <View style={styles.body}>
          <Pressable style={styles.box} onPress={onCameraSelected}>
            <Ionicons name="camera" size={32} color={Colors.secondary} />
            <Text className="font-pbold text-center" style={styles.text}>
              {i18n.t("camera")}
            </Text>
          </Pressable>
          <Pressable style={styles.box} onPress={onGallerySelected}>
            <Ionicons name="image" size={32} color={Colors.secondary} />
            <Text className="font-pbold text-center" style={styles.text}>
              {i18n.t("gallery")}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
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
  modal: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    width: "80%",
    height: 200,
    paddingHorizontal: 32,
    paddingVertical: 12,
    justifyContent: "space-around",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 32,
  },
  body: {
    marginTop: 32,
    flex: 1,
    flexDirection: "row",
  },
  box: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: Colors.secondary,
  },
});
