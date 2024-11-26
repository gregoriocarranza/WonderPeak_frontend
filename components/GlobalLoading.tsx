import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function GlobalLoading() {
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size={"large"} color={Colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
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
