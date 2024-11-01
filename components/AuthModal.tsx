import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

type Props = {
  children: React.ReactNode;
};

export default function AuthModal({ children }: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.globalContainer}>
        <StatusBar style="dark" />
        <Image source={images.logo} style={styles.logo} />
        <View style={styles.modal}>
          <ImageBackground
            style={styles.imageBackground}
            resizeMode="cover"
            source={images.background}
            className="h-full w-full"
          >
            <View style={styles.modalContent}>{children}</View>
          </ImageBackground>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    height: "100%",
    backgroundColor: Colors.white,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    height: 645,
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "relative",
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    position: "relative",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  modalContent: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 20,
  },
  logo: {
    marginTop: 100,
    zIndex: 9,
    marginLeft: "50%",
    position: "absolute",
    left: -100,
    top: 0,
  },
});
