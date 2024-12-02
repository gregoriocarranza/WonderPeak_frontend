import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  onPressAction: () => void;
};

export default function EditPicturesButton({ onPressAction }: Props) {
  return (
    <Pressable
      className="edit-button"
      style={styles.button}
      onPress={onPressAction}
    >
      <MaterialIcons
        name="mode-edit-outline"
        size={24}
        color={Colors.deepPurple}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tabsBackground,
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
});
