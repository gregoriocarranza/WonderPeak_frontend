import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from 'expo-file-system'; // Importa FileSystem
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import i18n from "@/languages";
import FormField from "../FormField";
import CustomButton from "../CustomButton";

const { width: screenWidth } = Dimensions.get("window");

type FormState = {
  title: string,
  text: string,
  location: { latitude: any, longitude: any, mapsUrl: string },
  multimediaFiletype: string,
  multimediaFile: string
};

type SelectedImage = {
  uri: string;
  type: string | undefined;
};

type Props = {
  goBack: () => void;
  publish: () => void;
  data: SelectedImage[];
};

export default function SettingsPostComponent({
  goBack,
  data,
  publish,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    text: "",
    location: { latitude: 17.562, longitude: -3.625, mapsUrl: "" },
    multimediaFiletype: "BASE64",
    multimediaFile: "", // Se asignará luego de la codificación
  });

  // Función para convertir la imagen a base64
  const encode = async (data: SelectedImage[]) => {
    if (data && data.length > 0) {
      try {
        const base64 = await FileSystem.readAsStringAsync(data[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setForm((prevForm) => ({ ...prevForm, multimediaFile: base64 }));
      } catch (error) {
        console.log("Error al convertir la imagen a base64:", error);
        Alert.alert("Error", "No se pudo procesar la imagen.");
      }
    }
  };

  useEffect(() => {
    encode(data); // Codifica la imagen al montar el componente
  }, [data]);

  const uploadPost = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://wonderpeak.uade.susoft.com.ar/api/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Error al subir imagen el usuario");
      }

      const responseData = await response.json();
      console.log(responseData);
      finalAction();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Hubo un problema al subir la imagen.");
    } finally {
      setLoading(false)
    }
  };

  const finalAction = (): void => {
    router.replace("/home");
    publish();
  };

  return (
    <>
      {loading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={"large"} color={Colors.white} />
        </View>
      )}
      <View className="flex-row justify-between" style={styles.header}>
        <View className="flex-row items-center justify-center">
          <Pressable onPress={goBack} className="p-2">
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors.secondary}
            />
          </Pressable>
          <Text className="font-psemibold" style={styles.text}>
            {i18n.t("newPost")}
          </Text>
        </View>
      </View>

      <View style={styles.customField}>
        {data && data.length > 0 && (
          <FlatList
            style={styles.list}
            data={data}
            keyExtractor={(item, index) => item?.uri + index}          
            horizontal
            pagingEnabled
            renderItem={({ item }) => (
              <View style={styles.mediaContainer}>
                {(item.type === "image" || item.type === "photo") && (
                  <Image
                    source={{ uri: item.uri }}
                    resizeMode="cover"
                    style={styles.image}
                  />
                )}
                {item.type === "video" && (
                  <Video
                    source={{ uri: item.uri }}
                    style={styles.image}
                    useNativeControls
                    isLooping
                  />
                )}
              </View>
            )}
          />
        )}

        <View style={styles.settingsForm}>
          <FormField
            title={i18n.t("description")}
            value={form.title}
            placeholder={i18n.t("descriptionLegend")}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mb-4"
          />
          <FormField
            title={i18n.t("addressee")}
            value={form.text}
            placeholder={i18n.t("followers")}
            handleChangeText={(e) => setForm({ ...form, text: e })}
            otherStyles="mb-4"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          label={i18n.t("publish")}
          theme="primary"
          onPress={uploadPost}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    height: 72,
  },
  customField: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    flex: 1,
  },
  footer: {
    padding: 10,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  image: {
    width: screenWidth * 0.8,
    margin: "auto",
    height: "100%",
  },
  text: {
    color: Colors.light.text,
    fontSize: 16,
  },
  mediaContainer: {
    width: screenWidth,
  },
  settingsForm: {
    padding: 24,
  },
  list: {
    margin: "auto",
  },
  activityIndicatorContainer: {
    borderWidth: 2,
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