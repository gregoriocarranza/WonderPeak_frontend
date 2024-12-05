import React, { useState } from "react";
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
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import i18n from "@/languages";
import { useAuth } from "@/hooks/authContext";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import GlobalLoading from "../GlobalLoading";
import MapScreen from "./mapScreen";
import { getMediaType } from "@/utils/getMediaType";

const { width: screenWidth } = Dimensions.get("window");

type FormState = {
  title: string;
  text: string;
  location: {
    placeHolder: string;
    latitude: number | null;
    longitude: number | null;
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
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    text: "",
    location: {
      placeHolder: "",
      latitude: null,
      longitude: null,
      mapsUrl: "",
    },
    multimediaFiletype: "BASE64",
    multimediaFile: "",
  });

  const uploadPost = async (): Promise<void> => {
    const formData = new FormData();
    if (!isFormValid()) {
      return;
    }
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
      console.log("Post creado con éxito:", responseData);
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

  const handleLocationSelect = (latitude: number, longitude: number) => {
    setForm((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        latitude,
        longitude,
        mapsUrl: `https://www.google.com/maps?q=${latitude},${longitude}`,
      },
    }));
    setShowMap(false);
  };

  const isFormValid = (): boolean => {
    if (!form.title.trim()) {
      Alert.alert("Error", "El título es obligatorio.");
      return false;
    }

    if (!form.text.trim()) {
      Alert.alert("Error", "El texto es obligatorio.");
      return false;
    }

    if (!form?.location?.placeHolder.trim()) {
      Alert.alert("Error", "La ubicación es obligatoria.");
      return false;
    }

    return true;
  };

  return (
    <>
      {loading && <GlobalLoading />}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable onPress={goBack} style={styles.backButton}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors.secondary}
            />
          </Pressable>
          <Text style={styles.text}>{i18n.t("newPost")}</Text>
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
            value={form?.location?.placeHolder}
            placeholder={i18n.t("locationLegend")}
            handleChangeText={(e) =>
              setForm((prev) => ({
                ...prev,
                location: { ...prev.location, placeHolder: e },
              }))
            }
            otherStyles="mb-4"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View className="mb-4">
          <CustomButton
            label={
              form?.location?.latitude && form?.location?.longitude
                ? `Lat: ${form?.location?.latitude.toFixed(
                    3
                  )}, Long: ${form?.location?.longitude.toFixed(3)}`
                : "Seleccionar ubicación"
            }
            onPress={() => setShowMap(true)}
          />
        </View>
        <CustomButton
          label={i18n.t("publish")}
          theme="primary"
          onPress={uploadPost}
        />
      </View>

      {showMap && (
        <View style={StyleSheet.absoluteFill}>
          <MapScreen
            initialLatitude={form?.location?.latitude || 0}
            initialLongitude={form?.location?.longitude || 0}
            onConfirmLocation={handleLocationSelect}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    height: 72,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 10,
  },
  text: {
    color: Colors.light.text,
    fontSize: 16,
  },
  customField: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  footer: {
    padding: 10,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: "100%",
  },
  mediaContainer: {
    width: screenWidth,
  },
  settingsForm: {
    padding: 24,
  },
  list: {
    alignSelf: "center",
  },
  locationText: {
    marginTop: 10,
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  // centeredButton: {
  //   width: screenWidth * 0.9,
  //   justifyContent: "center",
  //   height: "20%",
  //   alignSelf: "center", // Centra el botón en el contenedor
  //   marginBottom: 20,
  //   marginTop: 0,
  // },
});
