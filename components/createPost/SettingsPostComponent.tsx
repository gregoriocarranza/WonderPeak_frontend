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
} from "react-native";
import * as FileSystem from "expo-file-system"; // Importa FileSystem
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import i18n from "@/languages";
import { useAuth } from "@/hooks/authContext";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import GlobalLoading from "../GlobalLoading";
import { getMediaType } from "@/utils/getMediaType";
import * as Location from 'expo-location';

const { width: screenWidth } = Dimensions.get("window");

type FormState = {
  title: string;
  text: string;
  location: {
    placeHolder: string;
    latitude: any;
    longitude: any;
    mapsUrl: string;
  };
  multimediaFiletype: string;
  multimediaFile: string;
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
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    text: "",
    location: {
      placeHolder: "",
      latitude: 17.562,
      longitude: -3.625,
      mapsUrl: "",
    },
    multimediaFiletype: "BASE64",
    multimediaFile: "", // Se asignará luego de la codificación
  });

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const uploadPost = async (): Promise<void> => {
    const formData = new FormData();

    // Adjuntar el archivo multimedia
    if (data && data.length > 0) {
      const fileUri = data[0].uri;
      const fileType = getMediaType(fileUri);
      const fileName = fileUri.split("/").pop() || "upload";

      formData.append("multimediaFile", {
        uri: fileUri,
        type: fileType,
        name: fileName,
      } as any);
      formData.append("multimediaFileType", fileType);
    }

    // Agregar metadata adicional
    formData.append("title", form.title);
    formData.append("text", form.text);
    formData.append("location", JSON.stringify(form.location));

    try {
      setLoading(true);

      const response = await fetch(
        "https://wonderpeak.uade.susoft.com.ar/api/posts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error al subir el post:", errorResponse);
        throw new Error("Error al subir el post");
      }

      const responseData = await response.json();
      // console.log("Post creado con éxito:", responseData);
      finalAction();
    } catch (err: any) {
      console.error("Error:", err);
      Alert.alert("Error", "Hubo un problema al subir el post.");
    } finally {
      setLoading(false);
    }
  };

  const finalAction = (): void => {
    router.replace("/home");
    publish();
  };



  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
    console.log(text)
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text)
  }

  return (
    <>
      {loading && <GlobalLoading />}
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
        <View style={styles.container}>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
          <FormField
            title={i18n.t("title")}
            value={form.title}
            placeholder={i18n.t("chooseTitle")}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mb-4"
          />
          <FormField
            title={i18n.t("description")}
            value={form.text}
            placeholder={i18n.t("descriptionLegend")}
            handleChangeText={(e) => setForm({ ...form, text: e })}
            otherStyles="mb-4"
          />
          <FormField
            title={i18n.t("addLocation")}
            value={form.location.placeHolder}
            placeholder={i18n.t("locationLegend")}
            handleChangeText={(e) =>
              setForm({
                ...form,
                location: {
                  ...form.location,
                  placeHolder: e,
                },
              })
            }
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
