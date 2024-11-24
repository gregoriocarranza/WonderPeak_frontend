import { StyleSheet, Text, View } from "react-native";
import React from "react";
import i18n from "@/languages";
import { Colors } from "@/constants/Colors";
import CustomButton from "./CustomButton";

type Props = {
  cancelAction: () => void;
  confirmAction: () => void;
};

export default function ConfirmationModal({
  cancelAction,
  confirmAction,
}: Props) {
  return (
    <View style={styles.modalBackground}>
      <View style={styles.modal}>
        <View style={styles.body}>
          <Text className="font-pbold text-center" style={{ fontSize: 16 }}>
            {i18n.t("areYouSureToExit")}
          </Text>
          <Text className="font-pregular text-center" style={{ fontSize: 16 }}>
            {i18n.t("youWillLoseYourChanges")}
          </Text>
        </View>
        <View className="flex-row" style={styles.footer}>
          <View style={styles.customSizeButton}>
            <CustomButton
              label={i18n.t("cancel")}
              theme="secondary"
              onPress={cancelAction}
              customSize
            />
          </View>
          <View style={styles.customSizeButton}>
            <CustomButton
              label={i18n.t("accept")}
              theme="primary"
              onPress={confirmAction}
              customSize
            />
          </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  body: {
    marginTop: 32,
  },
  footer: {
    justifyContent: "space-between",
    gap: 4,
  },
  customSizeButton: {
    height: 40,
    width: "45%",
  },
});
