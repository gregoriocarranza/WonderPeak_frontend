import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import i18n from "@/languages";
import FormField from "../FormField";
import CustomButton from "../CustomButton";

const { width: screenWidth } = Dimensions.get("window");

type FormState = {
  description: string;
  location: string;
  followers: string;
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
  const [form, setForm] = useState<FormState>({
    description: "",
    location: "",
    followers: "",
  });

  const finalAction = (): void => {
    router.replace("/home");
    publish();
  };

  return (
    <>
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
            keyExtractor={(item, index) => item.uri + index}          
            horizontal
            pagingEnabled
            renderItem={({ item }) => (
              <View style={styles.mediaContainer}>
                {item.type === "image" && (
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
            value={form.description}
            placeholder={i18n.t("descriptionLegend")}
            handleChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles="mb-4"
          />
          <FormField
            title={i18n.t("addLocation")}
            value={form.location}
            placeholder={i18n.t("locationLegend")}
            handleChangeText={(e) => setForm({ ...form, location: e })}
            otherStyles="mb-4"
          />
          <FormField
            title={i18n.t("addressee")}
            value={form.followers}
            placeholder={i18n.t("followers")}
            handleChangeText={(e) => setForm({ ...form, followers: e })}
            otherStyles="mb-4"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          label={i18n.t("publish")}
          theme="primary"
          onPress={finalAction}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.lightGray,
    height: 72,
  },
  customField: {
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    flex: 1,
  },
  footer: {
    padding: 10,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
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
});
