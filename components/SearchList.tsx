import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "@/constants";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function SearchList() {
  const goToProfile = () => {
    router.push("/userProfile");
  };
  return (
    <View>
      <Pressable onPress={goToProfile}>
        <View className="flex-row" style={styles.itemGlobalContainer}>
          <Image source={images.userProfile} style={styles.itemImage} />
          <View style={styles.userData}>
            <Text className="font-psemibold">Sofía Delgado</Text>
            <Text style={styles.userNickname} className="font-pregular">
              @SofiDel
            </Text>
          </View>
        </View>
      </Pressable>

      <Pressable>
        <View className="flex-row" style={styles.itemGlobalContainer}>
          <Image source={images.post} style={styles.itemImage} />
          <View style={styles.userData}>
            <Text className="font-psemibold">Diego Hernández</Text>
            <Text style={styles.userNickname} className="font-pregular">
              @DiegoxH
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemGlobalContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  itemImage: {
    height: 48,
    width: 48,
    borderRadius: 50,
  },
  userData: {
    paddingLeft: 12,
  },
  userNickname: {
    fontSize: 12,
    color: Colors.gray,
  },
});
