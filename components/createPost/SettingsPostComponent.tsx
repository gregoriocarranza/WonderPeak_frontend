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
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  LocationAccuracy
} from "expo-location";
import MapView, { Marker } from 'react-native-maps';

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

  const [loction, setLoction] = useState<LocationObject | null>(null);
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


  const requestLocationPermissions = async (): Promise<void> => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      console.log(currentPosition);
      setLoction(currentPosition);
    }
  }
  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        console.log("Nova localização!", response);
        //setLoction(response);
        setForm({
          ...form,
          location: {
            ...form.location,
            latitude: response.coords.latitude,
            longitude:response.coords.longitude,
          },
        })
      }
    );
  }, []);

  useEffect(() => {
    requestLocationPermissions();
  }, [form]);

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


        <View style={styles.mapContainer}>

          {
            loction &&
            <MapView style={styles.map} 
            initialRegion={{
              latitude: loction.coords.latitude,
              longitude: loction.coords.longitude,
              latitudeDelta: 0.0005,
              longitudeDelta: 0.0005
            }}>

              <Marker
                coordinate={{ latitude: loction.coords.latitude, longitude: loction.coords.longitude }}
              />

            </MapView>
          }
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
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    flex: 1,
    width: '100%'
  }
});
