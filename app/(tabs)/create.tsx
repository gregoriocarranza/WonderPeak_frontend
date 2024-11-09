import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

export default function Create() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result);
    } else {
      alert("No seleccionaste ninguna imagen");
    }
  }

  return (
    <SafeAreaView style={styles.customField}>
      <View className="flex-row justify-around">
        <Text className="font-psemibold">Nueva publicación</Text>
        <Link className="font-psemibold text-black underline" href="/load-post"> Siguiente</Link>
      </View>

      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={styles.image}
        />
      )}
      <View className="mb-4 justify-center">
        <CustomButton
          isLoading={false}
          label="Elegi una foto"
          theme="auth"
          onPress={pickImageAsync}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customField: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 30,
    borderColor: Colors.pink,
    flex: 1,
    justifyContent:'space-evenly',
   // alignItems: 'center',
  },
  Text:{backgroundColor: Colors.lightGray},
  image: {
    width: 400,
    height: 425,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  handlePasswordVisibility: {
    position: "absolute",
    right: 20,
    top: 14,
  },
});
