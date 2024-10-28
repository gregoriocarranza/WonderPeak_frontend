import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";

type Props = {
  children: React.ReactNode;
};

export default function AuthModal({ children }: Props) {
  return (
    <ScrollView contentContainerStyle={{ height: "100%" }}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
    height: 645,
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
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
    marginTop: 125,
    alignItems: "center",
    justifyContent: "flex-start",
    // borderWidth: 2,
    margin: 20,
  },
  logo: {
    marginTop: 100,
    zIndex: 9,
    marginLeft: "50%",
    position: "relative",
    left: -100,
  },
});
